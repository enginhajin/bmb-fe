import { SignInData, SignUpData } from '@/types/user'
import { BookListApiParams } from '@/types/books'
import axiosInstance from './axios'

export const postSignup = async (data: SignUpData) => {
  const response = await axiosInstance.post('/user/signup', data)
  return response.data
}

export const postSignin = async (data: SignInData) => {
  const response = await axiosInstance.post('/user/signin', data)
  return response.data
}

export const postSignout = async () => {
  const response = await axiosInstance.post('/user/signout')
  return response.data
}

export const getAdminUserList = async ({
  page,
  size,
  category,
  keyword,
}: BookListApiParams) => {
  const response = await axiosInstance.get('/admin/users', {
    params: { page, size, category, keyword },
  })
  return response.data
}
