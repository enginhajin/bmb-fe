export type UserRole = 'USER' | 'ADMIN'

export interface SignUpData {
  user_id: string
  nickname: string
  password: string
}

export interface SignInData {
  user_id: string
  password: string
}

export interface UserInfo {
  user_id: string
  nickname: string
  role: UserRole
}
