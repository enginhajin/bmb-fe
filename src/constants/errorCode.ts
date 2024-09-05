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

export const SIGNIN_ERROR_CODES = {
  INVALID_ID_OR_PASSWORD: {
    code: 'INVALID_ID_OR_PASSWORD',
    message: 'IDおよびパスワードをご確認ください。',
  },
} as const

export const BOOK_APPLICATION_ERROR_CODES = {
  INVALID_ISBN: {
    code: 'INVALID_ISBN',
    message: 'ISBNを確認してください。',
  },
  INVALID_FILE_FORMAT: {
    code: 'INVALID_FILE_FORMAT',
    message: 'jpeg、jpg、png形式のみアップロード可能です。',
  },
  INVALID_PUBLISHED_DATE: {
    code: 'INVALID_PUBLISHED_DATE',
    message: '日付を確認してください。',
  },
  INVALID_DESCRIPTION: {
    code: 'INVALID_DESCRIPTION',
    message: '1000文字以内で入力してください。',
  },
  BOOK_ALREADY_INSERT: {
    code: 'BOOK_ALREADY_INSERT',
    message: 'このISBNは登録済みのISBNです。',
  },
} as const
