import { BookListApiParams } from '@/types/books'
import axiosInstance from './axios'

export const getBookList = async ({
  page,
  size,
  category,
  keyword,
}: BookListApiParams) => {
  const response = await axiosInstance.get('/books', {
    params: { page, size, category, keyword },
  })
  return response.data
}

export const getBook = async (isbn: string) => {
  const response = await axiosInstance.get(`/books/${isbn}`)
  return response.data
}
