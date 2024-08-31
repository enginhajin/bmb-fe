'use client'

import { Suspense, useState } from 'react'
import { SearchInput } from '@/components/molecules/SearchInput'
import { BooksListView } from '@/components/organisms/BooksListView'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { BookListInfo } from '@/types/books'
import { useCustomPagination, useCustomSearchBooks } from '@/hooks'
import { Pagination } from '@/components/molecules/Pagination'
import { Dialog } from '@/components/ui/dialog'
import { ReturnDialogContent } from '@/components/organisms/ReturnDialogContent'

const mockData: BookListInfo = {
  total_pages: 6,
  current_page: 1,
  page_size: 10,
  total_items: 60,
  category: 'TITLE',
  keyword: 'test',
  books: [
    {
      id: '101',
      isbn: '9784479394358',
      title:
        '本を読んだことがない32歳がはじめて本を読む〜走れメロス・一房の葡萄・杜子春・本棚',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: 'かまど・みくのしん',
      publisher_name: '大和書房',
      status: 'CHECKED_OUT',
      loan_at: '2024-08-08',
      return_at: '2024-08-08',
    },
    {
      id: '201',
      isbn: '9784838732708',
      title: '生きのびるための事務',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: '坂口恭平',
      publisher_name: '大和書房',
      status: 'CHECKED_OUT',
      loan_at: '2024-08-08',
      return_at: '',
    },
    {
      id: '301',
      isbn: '9784479394351',
      title:
        '本を読んだことがない32歳がはじめて本を読む〜走れメロス・一房の葡萄・杜子春・本棚',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: 'かまど・みくのしん',
      publisher_name: '大和書房',
      status: 'CHECKED_OUT',
      loan_at: '2024-08-08',
      return_at: '',
    },
    {
      id: '401',
      isbn: '9784838732701',
      title: '生きのびるための事務',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: '坂口恭平',
      publisher_name: '大和書房',
      status: 'CHECKED_OUT',
      loan_at: '2024-08-08',
      return_at: '',
    },
    {
      id: '501',
      isbn: '9784479394311',
      title:
        '本を読んだことがない32歳がはじめて本を読む〜走れメロス・一房の葡萄・杜子春・本棚',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: 'かまど・みくのしん',
      publisher_name: '大和書房',
      status: 'CHECKED_OUT',
      loan_at: '2024-08-08',
      return_at: '',
    },
    {
      id: '601',
      isbn: '9784838732741',
      title: '生きのびるための事務',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: '坂口恭平',
      publisher_name: '大和書房',
      status: 'CHECKED_OUT',
      loan_at: '2024-08-08',
      return_at: '',
    },
  ],
}

function Page() {
  const { total_pages } = mockData
  const { currentPage, handlePageChange } = useCustomPagination(total_pages)
  const { currentSearchData, handleSearch } = useCustomSearchBooks()
  const [openReturnDialog, setOpenReturnDialog] = useState<boolean>(false)

  return (
    <GnbTemplate
      title="貸出リスト"
      headerContent={
        <SearchInput data={currentSearchData} onSearch={handleSearch} />
      }
    >
      <Dialog open={openReturnDialog} onOpenChange={setOpenReturnDialog}>
        <BooksListView
          data={mockData}
          onReturn={() => {
            setOpenReturnDialog(true)
          }}
        />
        <ReturnDialogContent
          onSubmit={() => {
            setOpenReturnDialog(false)
          }}
        />
      </Dialog>
      <Pagination
        total_pages={total_pages}
        current_page={currentPage}
        onPageChange={handlePageChange}
      />
    </GnbTemplate>
  )
}

export default function LoanListPage() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  )
}
