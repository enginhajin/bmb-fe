'use client'

import { Suspense, useState } from 'react'
import { SearchInput } from '@/components/molecules/SearchInput'
import { BooksListView } from '@/components/organisms/BooksListView'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { BookInfo } from '@/types/books'
import { useCustomPagination, useCustomSearchBooks } from '@/hooks'
import { Pagination } from '@/components/molecules/Pagination'
import { Dialog } from '@/components/ui/dialog'
import { DeleteDialogContent } from '@/components/organisms/DeleteDialogContent'
import { Sheet } from '@/components/ui/sheet'
import { LoanSheetConent } from '@/components/organisms/LoanSheetContent'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAdminBookList } from '@/api/book'
import { useDeleteBookMutation } from '@/mutations'

function Page() {
  const { currentPage, handlePageChange } = useCustomPagination(0)
  const { currentSearchData, handleSearch } = useCustomSearchBooks()
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openLoanSheet, setOpenLoanSheet] = useState<boolean>(false)
  const [currentBookData, setCurrentBookData] = useState<BookInfo>()
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['adminbooks', currentPage, currentSearchData],
    queryFn: () =>
      getAdminBookList({
        page: currentPage,
        size: 5, // 나중에 수정 필요 (테스트용, 기본 10)
        category: currentSearchData.category,
        keyword: currentSearchData.keyword,
      }),
    staleTime: 0,
  })

  const handleLoanSheetOpen = (isbn: string) => {
    const book = data.result.books.find((item: BookInfo) => item.isbn === isbn)
    setCurrentBookData(book)
    setOpenLoanSheet(true)
  }

  const deleteBookMutation = useDeleteBookMutation({
    onSuccessUpdateData: () => {
      queryClient.invalidateQueries({ queryKey: ['adminbooks'] })
    },
  })

  return (
    <GnbTemplate
      title="図書リスト（アドミン）"
      headerContent={
        <SearchInput data={currentSearchData} onSearch={handleSearch} />
      }
    >
      {data && (
        <>
          <BooksListView
            data={data.result}
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
                if (currentBookData) {
                  deleteBookMutation.mutate(currentBookData.isbn)
                  setOpenDeleteDialog(false)
                }
              }}
            />
          </Dialog>
          <Sheet open={openLoanSheet} onOpenChange={setOpenLoanSheet}>
            {currentBookData && <LoanSheetConent data={currentBookData} />}
          </Sheet>
          <Pagination
            total_pages={data.result.total_pages}
            current_page={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
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
