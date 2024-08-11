'use client'

import { Pagination } from '@/components/molecules/Pagination'
import {
  SearchInput,
  selectItems as searchSelectItems,
  FormData as SearchFormData,
} from '@/components/molecules/SearchInput'
import { BookList } from '@/components/organisms/BookList'
import { ReturnDialogContent } from '@/components/organisms/ReturnDialogContent'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { Dialog } from '@/components/ui/dialog'
import { useCustomSearchParams } from '@/hooks'
import { BookListData, SearchCategory } from '@/types/books'
import { Suspense, useEffect, useState } from 'react'

const mockData: BookListData = {
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
  const { searchParams, setSearchParams } = useCustomSearchParams()
  const [currentPage, setCurrentPage] = useState<string>(
    searchParams.page || '1',
  )
  const [currentSearchData, setSearchData] = useState<SearchFormData>({
    category: searchSelectItems.some(
      (item) => item.category === searchParams.category,
    )
      ? (searchParams.category as SearchCategory)
      : 'ALL',
    keyword: searchParams.keyword || '',
  })
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handlePageChange = (page: number) => {
    setCurrentPage(String(page))
  }

  const handleSearch = (data: SearchFormData) => {
    setSearchData(data)
  }

  useEffect(() => {
    setSearchParams({
      ...searchParams,
      page:
        Number(currentPage) < 1 || Number(currentPage) > total_pages
          ? '1'
          : currentPage,
    })
  }, [currentPage])

  useEffect(() => {
    const { category, keyword } = currentSearchData
    setSearchParams({
      ...searchParams,
      category,
      keyword,
    })
  }, [currentSearchData])

  return (
    <GnbTemplate>
      <SearchInput data={currentSearchData} onSearch={handleSearch} />
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <BookList data={mockData} setOpenDialog={setOpenDialog} />
        <ReturnDialogContent setOpenDialog={setOpenDialog} />
      </Dialog>
      <Pagination
        total_pages={total_pages}
        current_page={Number(searchParams.page)}
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
