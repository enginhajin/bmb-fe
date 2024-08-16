'use client'

import { Pagination } from '@/components/molecules/Pagination'
import { SearchInput } from '@/components/molecules/SearchInput'
import { BooksGridView } from '@/components/organisms/BooksGridView'
import { LoanDialogContent } from '@/components/organisms/LoanDialogContent'
import { ReturnDialogContent } from '@/components/organisms/ReturnDialogContent'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { Dialog } from '@/components/ui/dialog'
import { useCustomPagination, useCustomSearchBooks } from '@/hooks'
import { BookListInfo } from '@/types/books'
import { Suspense, useState } from 'react'

const mockData: BookListInfo = {
  total_pages: 5,
  current_page: 1,
  page_size: 10,
  total_items: 50,
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
      status: 'AVALIABLE',
      wish_count: 5,
      wished: true,
    },
    {
      id: '201',
      isbn: '9784838732708',
      title: '生きのびるための事務',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: '坂口恭平',
      publisher_name: '大和書房',
      status: 'UNAVALIABLE',
      wish_count: 0,
      wished: false,
    },
    {
      id: '301',
      isbn: '9784479394351',
      title:
        '本を読んだことがない32歳がはじめて本を読む〜走れメロス・一房の葡萄・杜子春・本棚',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: 'かまど・みくのしん',
      publisher_name: '大和書房',
      status: 'CHECKEDOUT',
      wish_count: 5,
      wished: false,
    },
    {
      id: '401',
      isbn: '9784838732701',
      title: '生きのびるための事務',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: '坂口恭平',
      publisher_name: '大和書房',
      status: 'AVALIABLE',
      wish_count: 0,
      wished: false,
    },
    {
      id: '501',
      isbn: '9784479394311',
      title:
        '本を読んだことがない32歳がはじめて本を読む〜走れメロス・一房の葡萄・杜子春・本棚',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: 'かまど・みくのしん',
      publisher_name: '大和書房',
      status: 'AVALIABLE',
      wish_count: 5,
      wished: true,
    },
    {
      id: '601',
      isbn: '9784838732741',
      title: '生きのびるための事務',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: '坂口恭平',
      publisher_name: '大和書房',
      status: 'AVALIABLE',
      wish_count: 0,
      wished: false,
    },
  ],
}

function Page() {
  const { total_pages } = mockData
  const { currentPage, handlePageChange } = useCustomPagination(total_pages)
  const { currentSearchData, handleSearch } = useCustomSearchBooks()
  const [openReturnDialog, setOpenReturnDialog] = useState<boolean>(false)
  const [openLoanDialog, setOpenLoanDialog] = useState<boolean>(false)

  return (
    <GnbTemplate
      title="図書リスト"
      headerContent={
        <SearchInput data={currentSearchData} onSearch={handleSearch} />
      }
    >
      <BooksGridView
        data={mockData}
        onLoan={() => setOpenLoanDialog(true)}
        onReturn={() => setOpenReturnDialog(true)}
      />
      <Dialog open={openReturnDialog} onOpenChange={setOpenReturnDialog}>
        <ReturnDialogContent
          onSubmit={() => {
            setOpenReturnDialog(false)
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

export default function HomePage() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  )
}
