import { postLoan } from '@/api/book'
import { defaultErrorAlert } from '@/lib/utils'
import { ResponseErrorData } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { BookDown } from 'lucide-react'
import { toast } from 'sonner'

interface usePostLoanMutationProps {
  onSuccessUpdateData?: () => void
}

const usePostLoanMutation = ({
  onSuccessUpdateData,
}: usePostLoanMutationProps) => {
  return useMutation({
    mutationFn: (isbn: string) => postLoan({ book_isbn: isbn }),
    onSuccess: () => {
      onSuccessUpdateData?.()
      toast(
        <span className="flex items-center gap-2">
          <BookDown className="size-4 text-primary" />
          図書が貸し出されました。
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

export default usePostLoanMutation
