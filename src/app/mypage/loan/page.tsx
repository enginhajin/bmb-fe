'use client'

import { Suspense, useState } from 'react'
import { SearchInput } from '@/components/molecules/SearchInput'
import { BooksListView } from '@/components/organisms/BooksListView'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { useCustomPagination, useCustomSearchBooks } from '@/hooks'
import { Pagination } from '@/components/molecules/Pagination'
import { Dialog } from '@/components/ui/dialog'
import { ReturnDialogContent } from '@/components/organisms/ReturnDialogContent'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getLoanList } from '@/api/book'
import { usePutLoanMutation } from '@/mutations'

function Page() {
  const { currentPage, handlePageChange } = useCustomPagination(0)
  const { currentSearchData, handleSearch } = useCustomSearchBooks()
  const [openReturnDialog, setOpenReturnDialog] = useState<boolean>(false)
  const [currentBookIsbn, setCurrentBookIsbn] = useState<string>('')

  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['loanlist', currentPage, currentSearchData],
    queryFn: () =>
      getLoanList({
        page: currentPage,
        size: 5, // 나중에 수정 필요 (테스트용, 기본 10)
        category: currentSearchData.category,
        keyword: currentSearchData.keyword,
      }),
    staleTime: 0,
  })

  const putLoanMutation = usePutLoanMutation({
    onSuccessUpdateData: () => {
      queryClient.invalidateQueries({ queryKey: ['loanlist'] })
    },
  })

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
          <Dialog open={openReturnDialog} onOpenChange={setOpenReturnDialog}>
            <ReturnDialogContent
              onSubmit={() => {
                putLoanMutation.mutate(currentBookIsbn)
                setOpenReturnDialog(false)
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

export default function LoanListPage() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  )
}
