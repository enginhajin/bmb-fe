'use client'

import Link from 'next/link'
import { SignTemplate } from '@/components/templates/SignTemplate'
import { Button } from '@/components/ui/button'
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
import { CircleAlert, UserPlus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SignUpData } from '@/types/user'
import { PATHS } from '@/constants/path'
import { useMutation } from '@tanstack/react-query'
import { postSignup } from '@/api/auth'
import { AxiosError } from 'axios'
import { SIGNUP_ERROR_CODES } from '@/constants/errorCode'
import { ResponseErrorData } from '@/types/api'
import { toast } from 'sonner'
import { useCustomNavigation } from '@/hooks'

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)|(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/

const userIdRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{4,10}$/

const nicknameRegex = /^[ぁ-ゔァ-ヴー一-龯a-zA-Z0-9]{2,10}$/

const schema = z.object({
  user_id: z
    .string()
    .min(4, { message: '4文字以上入力してください。' })
    .max(10, { message: '10文字以下入力してください。' })
    .regex(userIdRegex, {
      message: '半角英数字を組み合わせてください。',
    }),
  password: z
    .string()
    .min(8, { message: '8文字以上入力してください。' })
    .max(15, { message: '15文字以下入力してください。' })
    .regex(passwordRegex, {
      message: '半角英字と、数字または記号を組み合わせてください。',
    }),
  nickname: z
    .string()
    .min(2, '２文字以上入力してください。')
    .max(10, { message: '10文字以下入力してください。' })
    .regex(nicknameRegex, {
      message: '日本語と英数字のみ入力できます。',
    }),
})

export default function SignUpPage() {
  const form = useForm<SignUpData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      user_id: '',
      password: '',
      nickname: '',
    },
  })
  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
    watch,
    setError,
  } = form

  const user_id = watch('user_id')
  const password = watch('password')
  const nickname = watch('nickname')

  const isButtonDisabled = !(
    user_id &&
    password &&
    nickname &&
    isDirty &&
    isValid
  )

  const { navigateToSignIn } = useCustomNavigation()

  const mutation = useMutation({
    mutationFn: (data: SignUpData) => postSignup(data),
    onSuccess: () => {
      toast(
        <span className="flex items-center gap-2">
          <UserPlus className="size-4 text-primary" />
          アカウントの作成を完了しました。ログインしてください。
        </span>,
        {
          duration: 4000,
        },
      )
      navigateToSignIn()
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.data) {
        const errorData = error.response.data as ResponseErrorData

        switch (errorData.code) {
          case SIGNUP_ERROR_CODES.ID_DUPLICATION.code:
            setError('user_id', {
              type: 'manual',
              message: SIGNUP_ERROR_CODES.ID_DUPLICATION.message,
            })
            break
          case SIGNUP_ERROR_CODES.NICKNAME_DUPLICATION.code:
            setError('nickname', {
              type: 'manual',
              message: SIGNUP_ERROR_CODES.NICKNAME_DUPLICATION.message,
            })
            break
          default:
            alert(`Unhandled error : ${error.message}`)
        }
      }
    },
  })

  const onSubmit = (data: SignUpData) => {
    mutation.mutate(data)
  }

  return (
    <SignTemplate
      title="アカウントの作成"
      footer={
        <Link
          href={PATHS.SIGNIN}
          className="text-sm text-muted-foreground underline hover:text-primary"
        >
          ログインはこちら
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
          <FormField
            control={control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>bmbで表示される名前</FormLabel>
                <FormControl>
                  <Input placeholder="名前を入力してください" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="flex items-center text-xs text-tertiary">
            <CircleAlert className="mr-1 size-4" />
            <Link
              href="https://policies.google.com/terms?hl=ja"
              target="_blank"
              className="cursor-pointer underline"
            >
              利用規約
            </Link>
            と
            <Link
              href="https://policies.google.com/privacy?hl=ja"
              target="_blank"
              className="cursor-pointer underline"
            >
              プライバシーポリシー
            </Link>
            への同意が必要です。
          </p>
          <Button type="submit" disabled={isButtonDisabled} className="w-full">
            同意して作成
          </Button>
        </form>
      </Form>
    </SignTemplate>
  )
}
