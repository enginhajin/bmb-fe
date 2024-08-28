export const SIGNUP_ERROR_CODES = {
  INVALID_ID_FORMAT: {
    code: 'INVALID_ID_FORMAT',
    message: 'ID形式に合いません。',
  },
  INVALID_NICKNAME_FORMAT: {
    code: 'INVALID_NICKNAME_FORMAT',
    message: 'Nickname形式に合いません。',
  },
  INVALID_PASSWORD_FORMAT: {
    code: 'INVALID_PASSWORD_FORMAT',
    message: 'Password形式に合いません。',
  },
  ID_DUPLICATION: {
    code: 'ID_DUPLICATION',
    message: 'すでに使用中のIDです。別のIDを指定してください。',
  },
  NICKNAME_DUPLICATION: {
    code: 'NICKNAME_DUPLICATION',
    message: 'すでに使用中の名前です。別の名前を指定してください。',
  },
} as const

export type Paths = (typeof SIGNUP_ERROR_CODES)[keyof typeof SIGNUP_ERROR_CODES]
