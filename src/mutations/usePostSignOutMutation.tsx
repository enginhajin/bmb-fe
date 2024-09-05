import { postSignout } from '@/api/auth'
import { useCustomNavigation } from '@/hooks'
import { defaultErrorAlert, deleteTokenInfo } from '@/lib/utils'
import { useUserStore } from '@/stores'
import { ResponseErrorData } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserCheck } from 'lucide-react'
import { toast } from 'sonner'

const usePostSignOutMutation = () => {
  const { navigateToSignIn } = useCustomNavigation()
  return useMutation({
    mutationFn: () => postSignout(),
    onSuccess: () => {
      useUserStore.getState().deleteUserInfo()
      deleteTokenInfo()
      toast(
        <span className="flex items-center gap-2">
          <UserCheck className="size-4 text-primary" />
          bmbからサインアウトできました。
        </span>,
        {
          duration: 3000,
        },
      )
      navigateToSignIn()
    },
    onError: (error: AxiosError) => {
      if (error?.response?.data) {
        const errorData = error.response.data as ResponseErrorData
        defaultErrorAlert(errorData)
      }
    },
  })
}
export default usePostSignOutMutation
