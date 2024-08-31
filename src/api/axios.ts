import { getAccessToken, setAccessToken, updateUserInfo } from '@/lib/utils'
import axios, { AxiosError } from 'axios'

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_DOMAIN}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const copyConfig = { ...config }
    if (!copyConfig.headers) return copyConfig
    const accessToken = getAccessToken()

    if (accessToken && config.headers) {
      copyConfig.headers.Authorization = `Bearer ${accessToken}`
    }
    return copyConfig
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { config, response } = error
    const accessToken = getAccessToken()

    if (response) {
      const excludedUrls = ['/user/signin', '/user/signup']

      if (excludedUrls.some((url) => config?.url?.startsWith(url))) {
        return Promise.reject(error)
      }

      const { status } = response
      if (!accessToken || status === 401) {
        try {
          const refreshTokenResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth`,
            {},
            { withCredentials: true },
          )
          const { result, token } = refreshTokenResponse.data
          updateUserInfo(result)
          setAccessToken(token)

          if (error.config) {
            return await axiosInstance.request({
              ...error.config,
              headers: {
                ...error.config.headers,
                Authorization: `Bearer ${accessToken}`,
              },
            })
          }
        } catch (refreshError) {
          alert('Tokenの更新に失敗しました。またログインしてください。')
          window.location.href = '/signin'
        }
      } else if (status === 403) {
        alert('アクセス権がありません。ログインページにリダイレクトします。')
        window.location.href = '/signin'
      } else if (status >= 500) {
        alert('サーバーエラーが発生しました。管理者にお問い合わせください。')
        window.location.href = '/signin'
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
