'use client'

import { Suspense, useState, useEffect } from 'react'
import {
  SearchInput,
  selectItems as searchSelectItems,
} from '@/components/molecules/SearchInput'
import { BooksListView } from '@/components/organisms/BooksListView'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { BookSearchInfo, BookWishListInfo, SearchCategory } from '@/types/books'
import { useCustomSearchParams } from '@/hooks'
import { Pagination } from '@/components/molecules/Pagination'
import { Dialog } from '@/components/ui/dialog'
import { DeleteDialogContent } from '@/components/organisms/DeleteDialogContent'

const mockData: BookWishListInfo = {
  total_pages: 6,
  current_page: 1,
  page_size: 10,
  total_items: 60,
  category: 'TITLE',
  keyword: 'test',
  wishes: [
    {
      id: '101',
      isbn: '9784479394358',
      title:
        '本を読んだことがない32歳がはじめて本を読む〜走れメロス・一房の葡萄・杜子春・本棚',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: 'かまど・みくのしん',
      publisher_name: '大和書房',
      status: 'AVALIABLE',
    },
    {
      id: '201',
      isbn: '9784838732708',
      title: '生きのびるための事務',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: '坂口恭平',
      publisher_name: '大和書房',
      status: 'UNAVALIABLE',
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
    },
    {
      id: '401',
      isbn: '9784838732701',
      title: '生きのびるための事務',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: '坂口恭平',
      publisher_name: '大和書房',
      status: 'AVALIABLE',
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
    },
    {
      id: '601',
      isbn: '9784838732741',
      title: '生きのびるための事務',
      thumbnail: '/img/book/book_thumbnail.jpg',
      author_name: '坂口恭平',
      publisher_name: '大和書房',
      status: 'AVALIABLE',
    },
  ],
}

function Page() {
  const { total_pages } = mockData
  const { searchParams, setSearchParams } = useCustomSearchParams()
  const [currentPage, setCurrentPage] = useState<string>(
    searchParams.page || '1',
  )
  const [currentSearchData, setSearchData] = useState<BookSearchInfo>({
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

  const handleSearch = (data: BookSearchInfo) => {
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
    <GnbTemplate
      title="お気に入りリスト"
      headerContent={
        <SearchInput data={currentSearchData} onSearch={handleSearch} />
      }
    >
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <BooksListView data={mockData} setOpenDialog={setOpenDialog} />
        <DeleteDialogContent
          title="お気に入りから削除しますか？"
          setOpenDialog={setOpenDialog}
        />
      </Dialog>
      <Pagination
        total_pages={total_pages}
        current_page={Number(searchParams.page)}
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
