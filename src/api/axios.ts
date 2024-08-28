import axios, { AxiosError } from 'axios'

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_DOMAIN}`,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      alert('ネットワークエラーが発生しました。管理者にお問い合わせください。')
    } else if (error.response.status >= 500) {
      alert('サーバーエラーが発生しました。管理者にお問い合わせください。')
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
