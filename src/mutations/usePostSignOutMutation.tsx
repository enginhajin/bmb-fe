import { postSignout } from '@/api/auth'
import { useCustomNavigation } from '@/hooks'
import { defaultErrorAlert } from '@/lib/utils'
import { useUserStore } from '@/stores'
import { ResponseErrorData } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

const usePostSignOutMutation = () => {
  const { navigateToSignIn } = useCustomNavigation()
  return useMutation({
    mutationFn: () => postSignout(),
    onSuccess: () => {
      useUserStore.getState().deleteUserInfo()
      sessionStorage.removeItem('accessToken')
      navigateToSignIn()
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.data) {
        const errorData = error.response.data as ResponseErrorData
        defaultErrorAlert(errorData)
      }
    },
  })
}

export default usePostSignOutMutation
