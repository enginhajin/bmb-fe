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
import { SignTemplate } from '@/components/template/SignTemplate'

const schema = z.object({
  id: z.string().min(1, '必須項目です。'),
  password: z.string().min(1, '必須項目です。'),
})

type FormData = z.infer<typeof schema>

export default function SignInPage() {
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(
    null,
  )

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      id: '',
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

  const id = watch('id')
  const password = watch('password')

  const isButtonDisabled = !(id && password && isDirty && isValid)

  function onSubmit() {
    setSubmitErrorMessage('IDおよびパスワードをご確認ください')
    setFocus('id')
  }

  return (
    <SignTemplate
      title="ログイン"
      footer={
        <Link
          href="/signup"
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
            name="id"
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
            <p className="text-sm text-destructive">
              IDおよびパスワードをご確認ください
            </p>
          )}
          <Button type="submit" disabled={isButtonDisabled} className="w-full">
            ログイン
          </Button>
        </form>
      </Form>
    </SignTemplate>
  )
}
