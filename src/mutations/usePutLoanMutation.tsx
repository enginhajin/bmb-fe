import { putLoan } from '@/api/book'
import { defaultErrorAlert } from '@/lib/utils'
import { ResponseErrorData } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { BookUp } from 'lucide-react'
import { toast } from 'sonner'

interface usePutLoanMutationProps {
  onSuccessUpdateData?: () => void
}

const usePutLoanMutation = ({
  onSuccessUpdateData,
}: usePutLoanMutationProps) => {
  return useMutation({
    mutationFn: (isbn: string) => putLoan({ book_isbn: isbn }),
    onSuccess: () => {
      onSuccessUpdateData?.()
      toast(
        <span className="flex items-center gap-2">
          <BookUp className="size-4 text-primary" />
          図書が返却されました。
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

export default usePutLoanMutation
