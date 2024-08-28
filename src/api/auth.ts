import { SignUpData } from '@/types/user'
import axiosInstance from './axios'

export const postSignup = async (data: SignUpData) => {
  const response = await axiosInstance.post('/user/signup', data)
  return response.data
}
