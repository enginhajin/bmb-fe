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
import { ReturnDialogContent } from '@/components/organisms/ReturnDialogContent'
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { getLoanList } from '@/api/book'
import { usePutLoanMutation } from '@/mutations'
import { ApiResponse } from '@/types/api'
import { BookListInfo } from '@/types/books'
import { AxiosError } from 'axios'
import { handleBookListError } from '@/lib/utils'
import { AuthDialogContent } from '@/components/organisms/AuthDialogContent'

function Page() {
  const { isUser, dialogOpen, dialogTitle, setDialogOpen, handleDialogSubmit } =
    useCustomCheckRoleDialog({ requiredRole: 'USER' })
  const { currentPage, handlePageChange, setTotalPage } = useCustomPagination()
  const { currentSearchData, handleSearch } = useCustomSearchBooks({
    handlePageChange,
  })
  const [openReturnDialog, setOpenReturnDialog] = useState<boolean>(false)
  const [currentBookIsbn, setCurrentBookIsbn] = useState<string>('')

  const queryClient = useQueryClient()

  const {
    data,
    error,
  }: UseQueryResult<ApiResponse<BookListInfo>, AxiosError> = useQuery({
    queryKey: ['loanlist', currentPage, currentSearchData],
    queryFn: () =>
      getLoanList({
        page: currentPage,
        size: 3, // 나중에 수정 필요 (테스트용, 기본 10)
        category: currentSearchData.category,
        keyword: currentSearchData.keyword,
      }),
    staleTime: 0,
    retry: 0,
    enabled: !!isUser,
  })

  const putLoanMutation = usePutLoanMutation({
    onSuccessUpdateData: () => {
      queryClient.invalidateQueries({ queryKey: ['loanlist'] })
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
      title="貸出リスト"
      headerContent={
        <SearchInput data={currentSearchData} onSearch={handleSearch} />
      }
    >
      {data && (
        <>
          <BooksListView
            data={data.result}
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
          <Dialog open={openReturnDialog} onOpenChange={setOpenReturnDialog}>
            <ReturnDialogContent
              onSubmit={() => {
                putLoanMutation.mutate(currentBookIsbn)
                setOpenReturnDialog(false)
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

export default function LoanListPage() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  )
}
