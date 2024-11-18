export type BookStatus = 'AVAILABLE' | 'UNAVAILABLE' | 'CHECKED_OUT'
export type BookSearchCategory = 'ALL' | 'TITLE' | 'AUTHOR' | 'PUBLISHER'
export type UserSearchCategory = 'ALL' | 'ID' | 'NICKNAME'
export interface BookInfo {
  id: string
  book_id?: string
  isbn: string
  title: string
  thumbnail: string
  author_name: string
  publisher_name: string
  status: BookStatus
  loan_at?: string
  return_at?: string | null
  wished?: boolean
  wish_count?: number
  loans?: BookLentalInfo[]
}

export interface BookDetailInfo extends BookInfo {
  description: string
  author_name: string
  published_date: string
}

export interface BookWishInfo {
  wished: boolean
  wish_count: number
}

export interface BookLentalInfo {
  id: string
  user_id: string
  nickname: string
  loan_at: string
  return_at: string | null
  title?: string
  isbn?: string
}
export interface ListPageInfo {
  total_pages: number
  current_page: number
  page_size: number
  total_items: number
}

export interface SearchInfo {
  category: string
  keyword: string
}

export interface BookIsbnInfo {
  book_isbn: string
}

export interface BookListItem extends BookInfo, BookWishInfo {}

export interface BookListInfo extends ListPageInfo, SearchInfo {
  books: BookInfo[]
}

export interface BookApplicationInfo extends BookDetailInfo {
  thumbnail: File
}

export interface BookListApiParams extends SearchInfo {
  page: number
  size: number
}
