import { useUserStore } from '@/stores'
import { UserInfo } from '@/types/user'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAccessToken = () => {
  return sessionStorage.getItem('accessToken')
}

export const setAccessToken = (value: string) => {
  sessionStorage.setItem('accessToken', value)
}

export const updateUserInfo = (data: UserInfo) => {
  const { setUserInfo } = useUserStore.getState() // 스토어에서 상태 업데이트 함수 가져오기
  setUserInfo(data)
}
