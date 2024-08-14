export type BookStatus = 'AVALIABLE' | 'UNAVALIABLE' | 'CHECKEDOUT'
export type SearchCategory = 'ALL' | 'TITLE' | 'AUTHOR' | 'PUBLISHER'

export interface BookInfo {
  id: string
  isbn: string
  title: string
  thumbnail: string
  author_name: string
  publisher_name: string
  status: BookStatus
}

export interface BookDetailInfo extends BookInfo {
  description: string
  author_name: string
  publisher_date: string
}

export interface BookWishInfo {
  wished: boolean
  wish_count: number
}

export interface ListPageInfo {
  total_pages: number
  current_page: number
  page_size: number
  total_items: number
}

export interface BookSearchInfo {
  category: SearchCategory
  keyword: string
}
export interface BookListItem extends BookInfo, BookWishInfo {}

export interface BookListInfo extends ListPageInfo, BookSearchInfo {
  books: BookListItem[]
}

export interface BookWishListInfo extends ListPageInfo, BookSearchInfo {
  wishes: BookInfo[]
}
