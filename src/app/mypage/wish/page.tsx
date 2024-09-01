'use client'

import { Suspense, useState } from 'react'
import { SearchInput } from '@/components/molecules/SearchInput'
import { BooksListView } from '@/components/organisms/BooksListView'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { useCustomPagination, useCustomSearchBooks } from '@/hooks'
import { Pagination } from '@/components/molecules/Pagination'
import { Dialog } from '@/components/ui/dialog'
import { DeleteDialogContent } from '@/components/organisms/DeleteDialogContent'
import { LoanDialogContent } from '@/components/organisms/LoanDialogContent'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getWishList } from '@/api/book'
import { useDeleteWishMutation } from '@/mutations'

function Page() {
  const { currentPage, handlePageChange } = useCustomPagination(0)
  const { currentSearchData, handleSearch } = useCustomSearchBooks()
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openLoanDialog, setOpenLoanDialog] = useState<boolean>(false)
  const [currentBookIsbn, setCurrentBookIsbn] = useState<string>('')

  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['wishlist', currentPage, currentSearchData],
    queryFn: () =>
      getWishList({
        page: currentPage,
        size: 5, // 나중에 수정 필요 (테스트용, 기본 10)
        category: currentSearchData.category,
        keyword: currentSearchData.keyword,
      }),
    staleTime: 0,
  })

  const deleteWishMutation = useDeleteWishMutation({
    onSuccessUpdateBooks: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
    },
  })

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
            onLoan={() => setOpenLoanDialog(true)}
          />
          <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
            <DeleteDialogContent
              onSubmit={() => {
                deleteWishMutation.mutate(currentBookIsbn)
                setOpenDeleteDialog(false)
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
            total_pages={data.result.total_pages}
            current_page={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
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
