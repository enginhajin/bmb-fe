'use client'

import { Suspense, useEffect, useState } from 'react'
import { SearchInput } from '@/components/molecules/SearchInput'
import { BooksListView } from '@/components/organisms/BooksListView'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import {
  useCustomCheckRoleDialog,
  useCustomPagination,
  useCustomSearchBooks,
} from '@/hooks'
import { Pagination } from '@/components/molecules/Pagination'
import { Dialog } from '@/components/ui/dialog'
import { DeleteDialogContent } from '@/components/organisms/DeleteDialogContent'
import { LoanDialogContent } from '@/components/organisms/LoanDialogContent'
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { getWishList } from '@/api/book'
import {
  useDeleteWishMutation,
  usePostLoanMutation,
  usePutLoanMutation,
} from '@/mutations'
import { ReturnDialogContent } from '@/components/organisms/ReturnDialogContent'
import { AxiosError } from 'axios'
import { ApiResponse } from '@/types/api'
import { BookListInfo } from '@/types/books'
import { handleBookListError } from '@/lib/utils'
import { AuthDialogContent } from '@/components/organisms/AuthDialogContent'

function Page() {
  const { isUser, dialogOpen, dialogTitle, setDialogOpen, handleDialogSubmit } =
    useCustomCheckRoleDialog({ requiredRole: 'USER' })
  const { currentPage, handlePageChange, setTotalPage } = useCustomPagination()
  const { currentSearchData, handleSearch } = useCustomSearchBooks({
    handlePageChange,
  })
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openReturnDialog, setOpenReturnDialog] = useState<boolean>(false)
  const [openLoanDialog, setOpenLoanDialog] = useState<boolean>(false)
  const [currentBookIsbn, setCurrentBookIsbn] = useState<string>('')

  const queryClient = useQueryClient()

  const {
    data,
    error,
  }: UseQueryResult<ApiResponse<BookListInfo>, AxiosError> = useQuery({
    queryKey: ['wishlist', currentPage, currentSearchData],
    queryFn: () =>
      getWishList({
        page: currentPage,
        size: 12,
        category: currentSearchData.category,
        keyword: currentSearchData.keyword,
      }),
    staleTime: 0,
    retry: 0,
    enabled: !!isUser,
  })

  const deleteWishMutation = useDeleteWishMutation({
    onSuccessUpdateBooks: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
    },
  })
  const postLoanMutation = usePostLoanMutation({
    onSuccessUpdateData: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
    },
  })
  const putLoanMutation = usePutLoanMutation({
    onSuccessUpdateData: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
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
      title="お気に入りリスト"
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
            onLoan={(isbn: string) => {
              setCurrentBookIsbn(isbn)
              setOpenLoanDialog(true)
            }}
            onReturn={(isbn: string) => {
              setCurrentBookIsbn(isbn)
              setOpenReturnDialog(true)
            }}
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
              onSubmit={() => {
                deleteWishMutation.mutate(currentBookIsbn)
                setOpenDeleteDialog(false)
              }}
            />
          </Dialog>
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

export default function WishListPage() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  )
}
