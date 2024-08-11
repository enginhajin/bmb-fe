export type BookStatus = 'AVALIABLE' | 'UNAVALIABLE' | 'CHECKEDOUT'
export type SearchCategory = 'ALL' | 'TITLE' | 'AUTHOR' | 'PUBLISHER'

export interface BookItem {
  id: string
  isbn: string
  title: string
  thumbnail: string
  author_name: string
  publisher_name: string
  status: BookStatus
  wish_count: number
  wished: boolean
}

export interface BookListData {
  total_pages: number
  current_page: number
  page_size: number
  total_items: number
  category: SearchCategory
  keyword: string
  books: BookItem[]
}

export interface BookInfoData {
  id: string
  isbn: string
  title: string
  description: string
  thumbnail: string
  author_name: string
  publisher_name: string
  publisher_date: string
  status: BookStatus
}

export interface BookWishData {
  wished: boolean
  wish_count: number
}
