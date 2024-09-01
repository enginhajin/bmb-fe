import { deleteWish } from '@/api/book'
import { defaultErrorAlert } from '@/lib/utils'
import { ApiResponse, ResponseErrorData } from '@/types/api'
import { BookWishInfo } from '@/types/books'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'

interface useDeleteWishMutationProps {
  onSuccessUpdateWish?: (data: BookWishInfo) => void
  onSuccessUpdateBooks?: () => void
}

const useDeleteWishMutation = ({
  onSuccessUpdateWish,
  onSuccessUpdateBooks,
}: useDeleteWishMutationProps) => {
  return useMutation({
    mutationFn: (isbn: string) => deleteWish(isbn),
    onSuccess: (data: ApiResponse<BookWishInfo>) => {
      onSuccessUpdateWish?.(data.result)
      onSuccessUpdateBooks?.()
      toast(
        <span className="flex items-center gap-2">
          <Heart className="size-4 text-red-400" />
          お気に入りから削除しました。
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

export default useDeleteWishMutation
