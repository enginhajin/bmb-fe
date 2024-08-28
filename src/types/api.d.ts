export interface ApiResponse<T> {
  statusCode: string
  message: string
  result: T
  token?: string
}

export interface ResponseErrorData {
  status: string
  code: string
  message: string
}
