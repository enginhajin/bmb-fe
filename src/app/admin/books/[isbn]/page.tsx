'use client'

import { BookInfo } from '@/components/organisms/BookInfo'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { BookDetailInfo, BookWishInfo } from '@/types/books'
import { useEffect, useState } from 'react'
import { Sheet } from '@/components/ui/sheet'
import { LoanSheetConent } from '@/components/organisms/LoanSheetContent'
import { DeleteDialogContent } from '@/components/organisms/DeleteDialogContent'
import { Dialog } from '@/components/ui/dialog'
import { useDeleteBookMutation } from '@/mutations'
import { useParams } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAdminBook, getWish } from '@/api/book'
import { ApiResponse } from '@/types/api'
import { useCustomNavigation } from '@/hooks'
import { AxiosError } from 'axios'

export default function BookPage() {
  const [openLoanSheet, setOpenLoanSheet] = useState<boolean>(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)

  const queryClient = useQueryClient()
  const { navigateToAdminBooks } = useCustomNavigation()

  const params = useParams()
  const isbn = params.isbn as string

  const { data, error } = useQuery<ApiResponse<BookDetailInfo>, Error>({
    queryKey: ['adminBook', isbn],
    queryFn: () => getAdminBook(isbn),
    retry: 0,
    staleTime: 0,
  })

  const { data: wishData } = useQuery<ApiResponse<BookWishInfo>>({
    queryKey: ['wish', isbn],
    queryFn: () => getWish(isbn),
    retry: 0,
    staleTime: 0,
  })

  const deleteBookMutation = useDeleteBookMutation({
    onSuccessUpdateData: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBook'] })
      navigateToAdminBooks()
    },
  })

  useEffect(() => {
    if (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        // 나중에 수정 필요 (ErrorCode 정리 후)
        alert('該当する図書がありません。リストに移動します。')
        navigateToAdminBooks()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return (
    <GnbTemplate>
      {data && wishData && (
        <>
          <BookInfo
            bookData={data.result}
            wishData={wishData.result}
            onOpenLoanSheet={() => {
              setOpenLoanSheet(true)
            }}
            onDelete={() => {
              setOpenDeleteDialog(true)
            }}
          />
          <Sheet open={openLoanSheet} onOpenChange={setOpenLoanSheet}>
            <LoanSheetConent data={data.result} />
          </Sheet>
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
                deleteBookMutation.mutate(isbn)
                setOpenDeleteDialog(false)
              }}
            />
          </Dialog>
        </>
      )}
    </GnbTemplate>
  )
}
