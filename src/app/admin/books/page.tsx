'use client'

import { Suspense, useState } from 'react'
import { SearchInput } from '@/components/molecules/SearchInput'
import { BooksListView } from '@/components/organisms/BooksListView'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { BookListInfo, BookInfo } from '@/types/books'
import { useCustomPagination, useCustomSearchBooks } from '@/hooks'
import { Pagination } from '@/components/molecules/Pagination'
import { Dialog } from '@/components/ui/dialog'
import { DeleteDialogContent } from '@/components/organisms/DeleteDialogContent'
import { Sheet } from '@/components/ui/sheet'
import { LoanSheetConent } from '@/components/organisms/LoanSheetContent'

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
      wish_count: 111,
      loans: [
        {
          id: '1',
          user_id: 'jonedoe1',
          nickname: 'ジョン',
          loan_at: '2024-08-19',
          return_at: null,
        },
        {
          id: '2',
          user_id: 'jonedoe2',
          nickname: 'ありがとう',
          loan_at: '2024-07-31',
          return_at: '2024-08-08',
        },
        {
          id: '3',
          user_id: 'jonedoe3',
          nickname: '鈴木',
          loan_at: '2024-07-15',
          return_at: '2024-07-16',
        },
      ],
    },
    {
      id: '201',
      isbn: '9784838732708',
      title: '生きのびるための事務',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: '坂口恭平',
      publisher_name: '大和書房',
      status: 'UNAVAILABLE',
      wish_count: 5,
      loans: [
        {
          id: '2',
          user_id: 'jonedoe2',
          nickname: 'あり',
          loan_at: '2024-07-15',
          return_at: null,
        },
      ],
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
      wish_count: 11,
      loans: [],
    },
    {
      id: '401',
      isbn: '9784838732701',
      title: '生きのびるための事務',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: '坂口恭平',
      publisher_name: '大和書房',
      status: 'AVAILABLE',
      wish_count: 0,
      loans: [],
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
      wish_count: 57,
      loans: [],
    },
    {
      id: '601',
      isbn: '9784838732741',
      title: '生きのびるための事務',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: '坂口恭平',
      publisher_name: '大和書房',
      status: 'AVAILABLE',
      wish_count: 128,
      loans: [],
    },
  ],
}

function Page() {
  const { total_pages, books } = mockData
  const { currentPage, handlePageChange } = useCustomPagination(total_pages)
  const { currentSearchData, handleSearch } = useCustomSearchBooks()
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openLoanSheet, setOpenLoanSheet] = useState<boolean>(false)
  const [currentBookData, setCurrentBookData] = useState<BookInfo>()

  const handleLoanSheetOpen = (isbn: string) => {
    const book = books.find((item) => item.isbn === isbn)
    setCurrentBookData(book)
    setOpenLoanSheet(true)
  }

  return (
    <GnbTemplate
      title="図書リスト（アドミン）"
      headerContent={
        <SearchInput data={currentSearchData} onSearch={handleSearch} />
      }
    >
      <BooksListView
        data={mockData}
        onDelete={() => {
          setOpenDeleteDialog(true)
        }}
        onOpenLoanSheet={(isbn: string) => {
          handleLoanSheetOpen(isbn)
        }}
        isVisibleBadge
        isAdmin
      />
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DeleteDialogContent
          title="図書を削除しますか？"
          description={
            <>
              図書の情報が全て削除されます。
              <br />
              もう一度確認してください。
            </>
          }
          onSubmit={() => {
            setOpenDeleteDialog(false)
          }}
        />
      </Dialog>
      <Sheet open={openLoanSheet} onOpenChange={setOpenLoanSheet}>
        {currentBookData && <LoanSheetConent data={currentBookData} />}
      </Sheet>
      <Pagination
        total_pages={total_pages}
        current_page={currentPage}
        onPageChange={handlePageChange}
      />
    </GnbTemplate>
  )
}

export default function AdminBookListPage() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  )
}
