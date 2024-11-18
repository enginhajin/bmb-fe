import { BookSearchCategory, UserSearchCategory } from '@/types/books'

export const bookSelectItems: {
  category: BookSearchCategory
  label: string
}[] = [
  {
    category: 'ALL',
    label: 'キーワード',
  },
  {
    category: 'TITLE',
    label: 'タイトル',
  },
  {
    category: 'AUTHOR',
    label: '著者',
  },
  {
    category: 'PUBLISHER',
    label: '出版社',
  },
]

export const userSelectItems: {
  category: UserSearchCategory
  label: string
}[] = [
  {
    category: 'ALL',
    label: 'キーワード',
  },
  {
    category: 'ID',
    label: 'ID',
  },
  {
    category: 'NICKNAME',
    label: '名前',
  },
]
