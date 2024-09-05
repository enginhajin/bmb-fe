import { deleteBook } from '@/api/book'
import { defaultErrorAlert } from '@/lib/utils'
import { ResponseErrorData } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { BookX } from 'lucide-react'
import { toast } from 'sonner'

interface useDeleteBookMutationProps {
  onSuccessUpdateData?: () => void
}

const useDeleteBookMutation = ({
  onSuccessUpdateData,
}: useDeleteBookMutationProps) => {
  return useMutation({
    mutationFn: (isbn: string) => deleteBook(isbn),
    onSuccess: () => {
      onSuccessUpdateData?.()
      toast(
        <span className="flex items-center gap-2">
          <BookX className="size-4 text-destructive" />
          図書が削除されました。
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

export default useDeleteBookMutation
