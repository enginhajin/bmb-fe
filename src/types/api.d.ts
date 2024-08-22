export interface ApiResponse<T> {
  statusCode: string
  message: string
  result: T
  token?: string
}
