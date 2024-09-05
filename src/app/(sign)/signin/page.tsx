'use client'

import Link from 'next/link'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { SignTemplate } from '@/components/templates/SignTemplate'
import { SignInData, UserInfo } from '@/types/user'
import { PATHS } from '@/constants/path'
import { AxiosError } from 'axios'
import { ApiResponse, ResponseErrorData } from '@/types/api'
import { SIGNIN_ERROR_CODES } from '@/constants/errorCode'
import { useMutation } from '@tanstack/react-query'
import { postSignin } from '@/api/auth'
import { useCustomNavigation } from '@/hooks'
import { toast } from 'sonner'
import { UserCheck } from 'lucide-react'
import { useUserStore } from '@/stores'
import { setTokenInfo } from '@/lib/utils'

const schema = z.object({
  user_id: z.string().min(1, '必須項目です。'),
  password: z.string().min(1, '必須項目です。'),
})

export default function SignInPage() {
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(
    null,
  )

  const { navigateToHome, navigateToAdminBooks } = useCustomNavigation()
  const { setUserInfo } = useUserStore()

  const form = useForm<SignInData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      user_id: '',
      password: '',
    },
  })
  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
    watch,
    setFocus,
  } = form

  const user_id = watch('user_id')
  const password = watch('password')

  const isButtonDisabled = !(user_id && password && isDirty && isValid)

  const mutation = useMutation({
    mutationFn: (data: SignInData) => postSignin(data),
    onSuccess: (data: ApiResponse<UserInfo>) => {
      setSubmitErrorMessage(null)
      setUserInfo(data.result)
      if (data.token) setTokenInfo(data.token)
      toast(
        <span className="flex items-center gap-2">
          <UserCheck className="size-4 text-primary" />
          こんにちは、{`${data.result.nickname}`}さん！bmbへようこそ。
        </span>,
        {
          duration: 3000,
        },
      )
      if (data.result.role === 'USER') {
        navigateToHome()
      } else {
        navigateToAdminBooks()
      }
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.data) {
        const errorData = error.response.data as ResponseErrorData
        switch (errorData.code) {
          case SIGNIN_ERROR_CODES.INVALID_ID_OR_PASSWORD.code:
            setSubmitErrorMessage(
              SIGNIN_ERROR_CODES.INVALID_ID_OR_PASSWORD.message,
            )
            setFocus('user_id')
            break
          default:
            alert(`Unhandled error : ${error.message}`)
        }
      }
    },
  })

  const onSubmit = (data: SignInData) => {
    mutation.mutate(data)
  }

  return (
    <SignTemplate
      title="ログイン"
      footer={
        <Link
          href={PATHS.SIGNUP}
          className="text-sm text-muted-foreground underline hover:text-primary"
        >
          アカウントの作成はこちら
        </Link>
      }
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={control}
            name="user_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>会員ID</FormLabel>
                <FormControl>
                  <Input placeholder="IDを入力してください" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="パスワードを入力してください"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {submitErrorMessage && (
            <p className="text-sm text-destructive">{submitErrorMessage}</p>
          )}
          <Button type="submit" disabled={isButtonDisabled} className="w-full">
            ログイン
          </Button>
        </form>
      </Form>
    </SignTemplate>
  )
}
