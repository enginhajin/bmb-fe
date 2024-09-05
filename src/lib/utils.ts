import { useUserStore } from '@/stores'
import { ResponseErrorData } from '@/types/api'
import { UserInfo } from '@/types/user'
import { AxiosResponse } from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { addHours, formatISO, parseISO, isPast } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTokenInfo = () => {
  const accessToken = localStorage.getItem('accessToken')
  const expiryTime = localStorage.getItem('expiryTime')

  if (!accessToken || !expiryTime) {
    return { accessToken: null, isExpired: true }
  }

  const expired = isPast(parseISO(expiryTime))

  return { accessToken, isExpired: expired }
}

export const setTokenInfo = (value: string) => {
  const expiryTime = addHours(new Date(), 1)

  localStorage.setItem('accessToken', value)
  localStorage.setItem('expiryTime', formatISO(expiryTime))
}

export const deleteTokenInfo = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('expiryTime')
}

export const updateUserInfo = (data: UserInfo) => {
  const { setUserInfo } = useUserStore.getState()
  setUserInfo(data)
}

export const defaultErrorAlert = (errorData: ResponseErrorData) => {
  alert(`${errorData.code} : 管理者にお問い合わせください。`)
}

export const handleBookListError = (
  errorResponse: AxiosResponse,
  handlePageChange: (page: number) => void,
) => {
  const errorData = errorResponse.data as ResponseErrorData
  if (errorData.code === 'INVALID_PAGE') {
    handlePageChange(1)
  } else {
    defaultErrorAlert(errorData)
  }
}
