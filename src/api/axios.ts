import { getTokenInfo, setTokenInfo, updateUserInfo } from '@/lib/utils'
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
    const tokenInfo = getTokenInfo()

    if (tokenInfo.accessToken && config.headers) {
      copyConfig.headers.Authorization = `Bearer ${tokenInfo.accessToken}`
    }
    return copyConfig
  },
  (error) => {
    Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { config, response } = error
    const tokenInfo = getTokenInfo()

    if (response) {
      const { status } = response
      const excludedUrls = ['/user/signin', '/user/signup']

      if (excludedUrls.some((url) => config?.url?.startsWith(url))) {
        return Promise.reject(error)
      }

      if (tokenInfo.isExpired || status === 401) {
        try {
          const refreshTokenResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth`,
            {},
            { withCredentials: true },
          )
          const { result, token } = refreshTokenResponse.data
          updateUserInfo(result)
          setTokenInfo(token)

          if (error.config) {
            return await axiosInstance.request({
              ...error.config,
              headers: {
                ...error.config.headers,
                Authorization: `Bearer ${token.accessToken}`,
              },
            })
          }
        } catch (refreshError) {
          alert('Tokenの更新に失敗しました。またログインしてください。')
          window.location.href = '/signin'
        }
      } else {
        return Promise.reject(error)
      }
    } else {
      return Promise.reject(error)
    }
    return null
  },
)

export default axiosInstance
