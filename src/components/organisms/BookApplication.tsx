import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { isBefore, isToday, startOfDay } from 'date-fns'
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
import { Textarea } from '@/components/ui/textarea'
import { ChangeEvent, useEffect, useState } from 'react'
import { BookApplicationInfo } from '@/types/books'
import Image from 'next/image'
import { Dialog } from '@/components/ui/dialog'
import { ApplicationDialogContent } from '@/components/organisms/ApplicationDialogContent'
import { useMutation } from '@tanstack/react-query'
import { postBook } from '@/api/book'
import { toast } from 'sonner'
import { BookPlus } from 'lucide-react'
import { AxiosError } from 'axios'
import { ResponseErrorData } from '@/types/api'
import { BOOK_APPLICATION_ERROR_CODES } from '@/constants/errorCode'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']
const MAX_FILE_SIZE = 0.5 * 1024 * 1024 // 500KB
const ISBN_REGEX = /^\d{13}$/
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

const checkValidDate = (dateString: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateString)) return false
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

const checkValidDateToday = (date: string): boolean => {
  const today = startOfDay(new Date())
  const inputDate = startOfDay(date)
  return isToday(inputDate) || isBefore(inputDate, today)
}

const schema = z.object({
  title: z.string().min(1, '必須項目です。'),
  thumbnail: z
    .instanceof(File, { message: '必須項目です。' })
    .refine((file) => file.size !== 0, '必須項目です。')
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `最大ファイルサイズは500KBです。`,
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'jpg、jpeg、png、webpのみアップロードできます。',
    ),
  isbn: z
    .string()
    .min(1, '必須項目です。')
    .regex(ISBN_REGEX, '13文字の数字で入力してください。'),
  author_name: z.string().min(1, '必須項目です。'),
  publisher_name: z.string().min(1, '必須項目です。'),
  published_date: z
    .string()
    .min(1, '必須項目です。')
    .regex(DATE_REGEX, '数字を入力すると変換されます。')
    .refine(checkValidDate, '日付を確認してください。')
    .refine(checkValidDateToday, '本日以降の日付は入力できません。'),
  description: z
    .string()
    .min(1, '必須項目です。')
    .max(1000, '1000文字以内で入力してください。'),
})

const BookApplication = () => {
  const [imagePreview, setImagePreview] = useState<string>('')
  const [openApplicationDialog, setOpenApplicationDialog] =
    useState<boolean>(false)

  const form = useForm<BookApplicationInfo>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      thumbnail: new File([''], 'filename'),
      isbn: '',
      author_name: '',
      publisher_name: '',
      published_date: '',
      description: '',
    },
  })
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    setError,
    setFocus,
  } = form
  const thumbnail = watch('thumbnail')

  const formatToDate = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, '')
    const year = cleaned.slice(0, 4)
    const month = cleaned.slice(4, 6)
    const day = cleaned.slice(6, 8)
    return `${year}${month ? `-${month}` : ''}${day ? `-${day}` : ''}`
  }

  const mutation = useMutation({
    mutationFn: (data: BookApplicationInfo) => postBook(data),
    onSuccess: () => {
      setOpenApplicationDialog(false)
      toast(
        <span className="flex items-center gap-2">
          <BookPlus className="size-4 text-primary" />
          図書が登録されました。
        </span>,
        {
          duration: 2000,
        },
      )
      reset()
      if (document.getElementById('thumbnailInput')) {
        ;(document.getElementById('thumbnailInput') as HTMLInputElement).value =
          ''
      }
    },
    onError: (error: AxiosError) => {
      setOpenApplicationDialog(false)
      if (error.response && error.response.data) {
        const errorData = error.response.data as ResponseErrorData

        switch (errorData.code) {
          case BOOK_APPLICATION_ERROR_CODES.INVALID_ISBN.code:
            setError('isbn', {
              type: 'manual',
              message: BOOK_APPLICATION_ERROR_CODES.INVALID_ISBN.message,
            })
            setFocus('isbn')
            break
          case BOOK_APPLICATION_ERROR_CODES.BOOK_ALREADY_INSERT.code:
            setError('isbn', {
              type: 'manual',
              message: BOOK_APPLICATION_ERROR_CODES.BOOK_ALREADY_INSERT.message,
            })
            setFocus('isbn')
            break
          case BOOK_APPLICATION_ERROR_CODES.INVALID_FILE_FORMAT.code:
            setError('thumbnail', {
              type: 'manual',
              message: BOOK_APPLICATION_ERROR_CODES.INVALID_FILE_FORMAT.message,
            })
            setFocus('thumbnail')
            break
          case BOOK_APPLICATION_ERROR_CODES.INVALID_PUBLISHED_DATE.code:
            setError('published_date', {
              type: 'manual',
              message:
                BOOK_APPLICATION_ERROR_CODES.INVALID_PUBLISHED_DATE.message,
            })
            setFocus('published_date')
            break
          case BOOK_APPLICATION_ERROR_CODES.INVALID_DESCRIPTION.code:
            setError('description', {
              type: 'manual',
              message: BOOK_APPLICATION_ERROR_CODES.INVALID_DESCRIPTION.message,
            })
            setFocus('description')
            break

          default:
            alert(`Unhandled error : ${error.message}`)
        }
      }
    },
  })

  const onSubmit = () => {
    mutation.mutate(getValues())
  }

  useEffect(() => {
    if (thumbnail) {
      const file = thumbnail
      setImagePreview(URL.createObjectURL(file))
    } else {
      setImagePreview('')
    }
  }, [thumbnail])

  return (
    <>
      <div className="mx-auto mt-8 w-full max-w-screen-md">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(() => setOpenApplicationDialog(true))}
            encType="multipart/form-data"
            className="space-y-6"
          >
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>図書名</FormLabel>
                  <FormControl>
                    <Input placeholder="図書名を入力してください" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnail"
              render={() => (
                <FormItem>
                  <FormLabel>表紙</FormLabel>
                  <div className="flex aspect-[7/10] w-full max-w-36 items-center justify-center overflow-hidden rounded-md border">
                    {thumbnail && thumbnail.size > 0 ? (
                      <Image
                        src={imagePreview as string}
                        width={144}
                        height={205}
                        alt="Uploaded image"
                        className="h-full"
                      />
                    ) : (
                      <span className="text-tertiary">プレビュー</span>
                    )}
                  </div>
                  <FormControl>
                    <Input
                      id="thumbnailInput"
                      type="file"
                      accept="image/*"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files) {
                          setValue('thumbnail', e.target.files[0], {
                            shouldValidate: true,
                          })
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="gap-4 sm:flex">
              <FormField
                control={control}
                name="isbn"
                render={({ field }) => (
                  <FormItem className="sm:w-1/2">
                    <FormLabel>ISBN</FormLabel>
                    <FormControl>
                      <Input placeholder="ISBNを入力してください" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="author_name"
                render={({ field }) => (
                  <FormItem className="mt-6 sm:mt-0 sm:w-1/2">
                    <FormLabel>著者名</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="著者名を入力してください"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="gap-4 sm:flex">
              <FormField
                control={control}
                name="publisher_name"
                render={({ field }) => (
                  <FormItem className="sm:w-1/2">
                    <FormLabel>出版社</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="出版社を入力してください"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="published_date"
                render={({ field: { value } }) => (
                  <FormItem className="mt-6 sm:mt-0 sm:w-1/2">
                    <FormLabel>発売日</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="YYYY-MM-DD"
                        onChange={(e) => {
                          const formattedValue = formatToDate(e.target.value)
                          setValue('published_date', formattedValue, {
                            shouldValidate: true,
                          })
                        }}
                        value={value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>内容紹介</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="内容紹介を入力してください"
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center">
              <Button type="submit" className="w-full max-w-48">
                登録する
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <Dialog
        open={openApplicationDialog}
        onOpenChange={setOpenApplicationDialog}
      >
        <ApplicationDialogContent onSubmit={onSubmit} />
      </Dialog>
    </>
  )
}

export { BookApplication }
