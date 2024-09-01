'use client'

import { getBookList } from '@/api/book'
import { Pagination } from '@/components/molecules/Pagination'
import { SearchInput } from '@/components/molecules/SearchInput'
import { BooksGridView } from '@/components/organisms/BooksGridView'
import { LoanDialogContent } from '@/components/organisms/LoanDialogContent'
import { ReturnDialogContent } from '@/components/organisms/ReturnDialogContent'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { Dialog } from '@/components/ui/dialog'
import { useCustomPagination, useCustomSearchBooks } from '@/hooks'
import {
  useDeleteWishMutation,
  usePostLoanMutation,
  usePostWishMutation,
  usePutLoanMutation,
} from '@/mutations'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Suspense, useState } from 'react'

function Page() {
  const { currentPage, handlePageChange } = useCustomPagination(0)
  const { currentSearchData, handleSearch } = useCustomSearchBooks()
  const [openReturnDialog, setOpenReturnDialog] = useState<boolean>(false)
  const [openLoanDialog, setOpenLoanDialog] = useState<boolean>(false)
  const [currentBookIsbn, setCurrentBookIsbn] = useState<string>('')

  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['books', currentPage, currentSearchData],
    queryFn: () =>
      getBookList({
        page: currentPage,
        size: 7, // 나중에 수정 필요 (테스트용, 기본 10)
        category: currentSearchData.category,
        keyword: currentSearchData.keyword,
      }),
    staleTime: 0,
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

export default function HomePage() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  )
}
