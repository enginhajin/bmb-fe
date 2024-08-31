'use client'

import { Suspense, useState } from 'react'
import { SearchInput } from '@/components/molecules/SearchInput'
import { BooksListView } from '@/components/organisms/BooksListView'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { BookListInfo } from '@/types/books'
import { useCustomPagination, useCustomSearchBooks } from '@/hooks'
import { Pagination } from '@/components/molecules/Pagination'
import { Dialog } from '@/components/ui/dialog'
import { DeleteDialogContent } from '@/components/organisms/DeleteDialogContent'
import { LoanDialogContent } from '@/components/organisms/LoanDialogContent'

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
      status: 'AVAILABLE',
    },
    {
      id: '201',
      isbn: '9784838732708',
      title: '生きのびるための事務',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: '坂口恭平',
      publisher_name: '大和書房',
      status: 'UNAVAILABLE',
    },
    {
      id: '301',
      isbn: '9784479394351',
      title:
        '本を読んだことがない32歳がはじめて本を読む〜走れメロス・一房の葡萄・杜子春・本棚',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: 'かまど・みくのしん',
      publisher_name: '大和書房',
      status: 'AVAILABLE',
    },
    {
      id: '401',
      isbn: '9784838732701',
      title: '生きのびるための事務',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: '坂口恭平',
      publisher_name: '大和書房',
      status: 'AVAILABLE',
    },
    {
      id: '501',
      isbn: '9784479394311',
      title:
        '本を読んだことがない32歳がはじめて本を読む〜走れメロス・一房の葡萄・杜子春・本棚',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: 'かまど・みくのしん',
      publisher_name: '大和書房',
      status: 'AVAILABLE',
    },
    {
      id: '601',
      isbn: '9784838732741',
      title: '生きのびるための事務',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: '坂口恭平',
      publisher_name: '大和書房',
      status: 'AVAILABLE',
    },
  ],
}

function Page() {
  const { total_pages } = mockData
  const { currentPage, handlePageChange } = useCustomPagination(total_pages)
  const { currentSearchData, handleSearch } = useCustomSearchBooks()
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openLoanDialog, setOpenLoanDialog] = useState<boolean>(false)

  return (
    <GnbTemplate
      title="お気に入りリスト"
      headerContent={
        <SearchInput data={currentSearchData} onSearch={handleSearch} />
      }
    >
      <BooksListView
        data={mockData}
        onDelete={() => setOpenDeleteDialog(true)}
        onLoan={() => setOpenLoanDialog(true)}
      />
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DeleteDialogContent
          onSubmit={() => {
            setOpenDeleteDialog(false)
          }}
        />
      </Dialog>
      <Dialog open={openLoanDialog} onOpenChange={setOpenLoanDialog}>
        <LoanDialogContent
          onSubmit={() => {
            setOpenLoanDialog(false)
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

export default function WishListPage() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  )
}
