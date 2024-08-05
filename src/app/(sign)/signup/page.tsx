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
import { CircleAlert } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)|(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/

const idRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{4,10}$/

const schema = z.object({
  id: z
    .string()
    .min(4, { message: '4文字以上入力してください。' })
    .max(10, { message: '10文字以下入力してください。' })
    .regex(idRegex, {
      message: '半角英数字を組み合わせてください。',
    }),
  password: z
    .string()
    .min(8, { message: '8文字以上入力してください。' })
    .max(15, { message: '15文字以下入力してください。' })
    .regex(passwordRegex, {
      message: '半角英字と、数字または記号を組み合わせてください。',
    }),
  name: z.string().min(2, '２文字以上入力してください。'),
})

type FormData = z.infer<typeof schema>

export default function SignUpPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      id: '',
      password: '',
      name: '',
    },
  })
  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
    watch,
    setError,
  } = form

  const id = watch('id')
  const password = watch('password')
  const name = watch('name')

  const isButtonDisabled = !(id && password && name && isDirty && isValid)

  function onSubmit() {
    setError(
      'id',
      {
        type: 'dulicate',
        message: 'すでに使用中のIDです。別のIDを指定してください。',
      },
      { shouldFocus: true },
    )
  }

  return (
    <SignTemplate
      title="アカウントの作成"
      footer={
        <Link
          href="/signin"
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
          <FormField
            control={control}
            name="name"
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
