'use client'

import { getBookList } from '@/api/book'
import { Pagination } from '@/components/molecules/Pagination'
import { SearchInput } from '@/components/molecules/SearchInput'
import { AuthDialogContent } from '@/components/organisms/AuthDialogContent'
import { BooksGridView } from '@/components/organisms/BooksGridView'
import { LoanDialogContent } from '@/components/organisms/LoanDialogContent'
import { ReturnDialogContent } from '@/components/organisms/ReturnDialogContent'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { Dialog } from '@/components/ui/dialog'
import {
  useCustomCheckRoleDialog,
  useCustomPagination,
  useCustomSearchBooks,
} from '@/hooks'
import { handleBookListError } from '@/lib/utils'
import {
  useDeleteWishMutation,
  usePostLoanMutation,
  usePostWishMutation,
  usePutLoanMutation,
} from '@/mutations'
import { ApiResponse } from '@/types/api'
import { BookListInfo } from '@/types/books'
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Suspense, useEffect, useState } from 'react'

function Page() {
  const { isUser, dialogOpen, dialogTitle, setDialogOpen, handleDialogSubmit } =
    useCustomCheckRoleDialog({ requiredRole: 'USER' })
  const { currentPage, handlePageChange, setTotalPage } = useCustomPagination()
  const { currentSearchData, handleSearch } = useCustomSearchBooks({
    handlePageChange,
  })
  const [openReturnDialog, setOpenReturnDialog] = useState<boolean>(false)
  const [openLoanDialog, setOpenLoanDialog] = useState<boolean>(false)
  const [currentBookIsbn, setCurrentBookIsbn] = useState<string>('')

  const queryClient = useQueryClient()

  const {
    data,
    error,
  }: UseQueryResult<ApiResponse<BookListInfo>, AxiosError> = useQuery({
    queryKey: ['books', currentPage, currentSearchData],
    queryFn: () =>
      getBookList({
        page: currentPage,
        size: 12,
        category: currentSearchData.category,
        keyword: currentSearchData.keyword,
      }),
    staleTime: 0,
    retry: 0,
    enabled: !!isUser,
  })

  const postWishMutation = usePostWishMutation({
    onSuccessUpdateBooks: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })
  const deleteWishMutation = useDeleteWishMutation({
    onSuccessUpdateBooks: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })
  const postLoanMutation = usePostLoanMutation({
    onSuccessUpdateData: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })
  const putLoanMutation = usePutLoanMutation({
    onSuccessUpdateData: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })

  const handleToggleWish = (wished: boolean, isbn: string) => {
    if (wished) {
      deleteWishMutation.mutate(isbn)
    } else {
      postWishMutation.mutate(isbn)
    }
  }

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
      title="図書リスト"
      headerContent={
        <SearchInput data={currentSearchData} onSearch={handleSearch} />
      }
    >
      {data && (
        <>
          <BooksGridView
            data={data.result}
            onLoan={(isbn: string) => {
              setCurrentBookIsbn(isbn)
              setOpenLoanDialog(true)
            }}
            onReturn={(isbn: string) => {
              setCurrentBookIsbn(isbn)
              setOpenReturnDialog(true)
            }}
            handleToggleWish={handleToggleWish}
          />
          {data.result.books.length > 0 && (
            <Pagination
              total_pages={data.result.total_pages}
              current_page={currentPage}
              onPageChange={handlePageChange}
            />
          )}
          <Dialog open={openReturnDialog} onOpenChange={setOpenReturnDialog}>
            <ReturnDialogContent
              onSubmit={() => {
                putLoanMutation.mutate(currentBookIsbn)
                setOpenReturnDialog(false)
              }}
            />
          </Dialog>
          <Dialog open={openLoanDialog} onOpenChange={setOpenLoanDialog}>
            <LoanDialogContent
              onSubmit={() => {
                postLoanMutation.mutate(currentBookIsbn)
                setOpenLoanDialog(false)
              }}
            />
          </Dialog>
        </>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AuthDialogContent title={dialogTitle} onSubmit={handleDialogSubmit} />
      </Dialog>
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
