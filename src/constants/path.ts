export const PATHS = {
  HOME: '/',
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  BOOKS: '/books',
  WISH: '/mypage/wish',
  LOAN: '/mypage/loan',
  ADMIN_BOOKS: '/admin/books',
  ADMIN_APPLICATION: '/admin/books/application',
  ADMIN_USERS: '/admin/users',
} as const

export type Paths = (typeof PATHS)[keyof typeof PATHS]
