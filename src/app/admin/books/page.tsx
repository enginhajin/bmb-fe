'use client'

import { Suspense, useEffect, useState } from 'react'
import { SearchInput } from '@/components/molecules/SearchInput'
import { BooksListView } from '@/components/organisms/BooksListView'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { BookInfo, BookListInfo } from '@/types/books'
import {
  useCustomCheckRoleDialog,
  useCustomPagination,
  useCustomSearchBooks,
} from '@/hooks'
import { Pagination } from '@/components/molecules/Pagination'
import { Dialog } from '@/components/ui/dialog'
import { DeleteDialogContent } from '@/components/organisms/DeleteDialogContent'
import { Sheet } from '@/components/ui/sheet'
import { LoanSheetConent } from '@/components/organisms/LoanSheetContent'
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { getAdminBookList } from '@/api/book'
import { useDeleteBookMutation } from '@/mutations'
import { ApiResponse } from '@/types/api'
import { AxiosError } from 'axios'
import { handleBookListError } from '@/lib/utils'
import { AuthDialogContent } from '@/components/organisms/AuthDialogContent'

function Page() {
  const {
    isAdmin,
    dialogOpen,
    dialogTitle,
    setDialogOpen,
    handleDialogSubmit,
  } = useCustomCheckRoleDialog({ requiredRole: 'ADMIN' })
  const { currentPage, handlePageChange, setTotalPage } = useCustomPagination()
  const { currentSearchData, handleSearch } = useCustomSearchBooks({
    handlePageChange,
  })
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openLoanSheet, setOpenLoanSheet] = useState<boolean>(false)
  const [currentBookData, setCurrentBookData] = useState<BookInfo>()
  const [currentBookIsbn, setCurrentBookIsbn] = useState<string>('')
  const queryClient = useQueryClient()

  const {
    data,
    error,
  }: UseQueryResult<ApiResponse<BookListInfo>, AxiosError> = useQuery({
    queryKey: ['adminbooks', currentPage, currentSearchData],
    queryFn: () =>
      getAdminBookList({
        page: currentPage,
        size: 5, // 나중에 수정 필요 (테스트용, 기본 10)
        category: currentSearchData.category,
        keyword: currentSearchData.keyword,
      }),
    staleTime: 0,
    retry: 0,
    enabled: !!isAdmin,
  })

  const handleLoanSheetOpen = (isbn: string) => {
    const book = data?.result.books.find((item: BookInfo) => item.isbn === isbn)
    setCurrentBookData(book)
    setOpenLoanSheet(true)
  }

  const deleteBookMutation = useDeleteBookMutation({
    onSuccessUpdateData: () => {
      queryClient.invalidateQueries({ queryKey: ['adminbooks'] })
    },
  })

  useEffect(() => {
    if (data) setTotalPage(data.result.total_pages)
  }, [data, setTotalPage])

  useEffect(() => {
    if (error && error.response) {
      handleBookListError(error.response, handlePageChange)
    }
  }, [error, handlePageChange])

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
            onDelete={(isbn: string) => {
              setCurrentBookIsbn(isbn)
              setOpenDeleteDialog(true)
            }}
            onOpenLoanSheet={(isbn: string) => {
              handleLoanSheetOpen(isbn)
            }}
            isVisibleBadge
            isAdmin
          />
          {data.result.books.length > 0 && (
            <Pagination
              total_pages={data.result.total_pages}
              current_page={currentPage}
              onPageChange={handlePageChange}
            />
          )}
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
                if (currentBookIsbn) {
                  deleteBookMutation.mutate(currentBookIsbn)
                  setOpenDeleteDialog(false)
                }
              }}
            />
          </Dialog>
          <Sheet open={openLoanSheet} onOpenChange={setOpenLoanSheet}>
            {currentBookData && <LoanSheetConent data={currentBookData} />}
          </Sheet>
        </>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AuthDialogContent title={dialogTitle} onSubmit={handleDialogSubmit} />
      </Dialog>
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
