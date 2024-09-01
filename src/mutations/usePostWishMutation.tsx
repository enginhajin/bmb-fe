import { postWish } from '@/api/book'
import { defaultErrorAlert } from '@/lib/utils'
import { ApiResponse, ResponseErrorData } from '@/types/api'
import { BookWishInfo } from '@/types/books'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'

interface usePostWishMutationProps {
  onSuccessUpdateWish?: (data: BookWishInfo) => void
  onSuccessUpdateBooks?: () => void
}

const usePostWishMutation = ({
  onSuccessUpdateWish,
  onSuccessUpdateBooks,
}: usePostWishMutationProps) => {
  return useMutation({
    mutationFn: (isbn: string) => postWish(isbn),
    onSuccess: (data: ApiResponse<BookWishInfo>) => {
      onSuccessUpdateWish?.(data.result)
      onSuccessUpdateBooks?.()
      toast(
        <span className="flex items-center gap-2">
          <Heart className="size-4 text-red-400" fill="#f87162" />
          お気に入りに追加しました。
        </span>,
        {
          duration: 2000,
        },
      )
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.data) {
        const errorData = error.response.data as ResponseErrorData
        defaultErrorAlert(errorData)
      }
    },
  })
}

export default usePostWishMutation
