'use client'

import { BookInfo } from '@/components/organisms/BookInfo'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { Dialog } from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
import { ReturnDialogContent } from '@/components/organisms/ReturnDialogContent'
import { LoanDialogContent } from '@/components/organisms/LoanDialogContent'
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { getBook, getWish } from '@/api/book'
import { useParams } from 'next/navigation'
import { AxiosError } from 'axios'
import { useCustomCheckRoleDialog, useCustomNavigation } from '@/hooks'
import { BookDetailInfo, BookWishInfo } from '@/types/books'
import {
  useDeleteWishMutation,
  usePostLoanMutation,
  usePostWishMutation,
  usePutLoanMutation,
} from '@/mutations'
import { ApiResponse, ResponseErrorData } from '@/types/api'
import { AuthDialogContent } from '@/components/organisms/AuthDialogContent'

export default function BookPage() {
  const { isUser, dialogOpen, dialogTitle, setDialogOpen, handleDialogSubmit } =
    useCustomCheckRoleDialog({ requiredRole: 'USER' })
  const [currentWishData, setCurrentWishData] = useState<BookWishInfo>({
    wish_count: 0,
    wished: false,
  })
  const [openReturnDialog, setOpenReturnDialog] = useState<boolean>(false)
  const [openLoanDialog, setOpenLoanDialog] = useState<boolean>(false)

  const queryClient = useQueryClient()
  const { navigateToHome } = useCustomNavigation()

  const params = useParams()
  const isbn = params.isbn as string

  const {
    data,
    error,
    isSuccess: isBookSuccess,
  }: UseQueryResult<ApiResponse<BookDetailInfo>, AxiosError> = useQuery({
    queryKey: ['book', isbn],
    queryFn: () => getBook(isbn),
    retry: 0,
    staleTime: 0,
    enabled: !!isUser,
  })

  const {
    data: wishData,
  }: UseQueryResult<ApiResponse<BookWishInfo>, AxiosError> = useQuery({
    queryKey: ['wish', isbn],
    queryFn: () => getWish(isbn),
    retry: 0,
    staleTime: 0,
    enabled: isBookSuccess,
  })

  const postWishMutation = usePostWishMutation({
    onSuccessUpdateWish: (wishInfo) => {
      setCurrentWishData(wishInfo)
    },
  })
  const deleteWishMutation = useDeleteWishMutation({
    onSuccessUpdateWish: (wishInfo) => {
      setCurrentWishData(wishInfo)
    },
  })
  const postLoanMutation = usePostLoanMutation({
    onSuccessUpdateData: () => {
      queryClient.invalidateQueries({ queryKey: ['book'] })
    },
  })
  const putLoanMutation = usePutLoanMutation({
    onSuccessUpdateData: () => {
      queryClient.invalidateQueries({ queryKey: ['book'] })
    },
  })

  useEffect(() => {
    if (error) {
      const errorData = error?.response?.data as ResponseErrorData
      if (errorData.code === 'NOT_FOUNDED_ISBN') {
        alert('該当する図書がありません。ホームに移動します。')
        navigateToHome()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  const handleToggleWish = (wished: boolean) => {
    if (wished) {
      deleteWishMutation.mutate(isbn)
    } else {
      postWishMutation.mutate(isbn)
    }
  }

  useEffect(() => {
    if (wishData) {
      setCurrentWishData(wishData.result)
    }
  }, [wishData])

  return (
    <GnbTemplate>
      {data && wishData && (
        <>
          <BookInfo
            bookData={data.result}
            wishData={currentWishData}
            onToggleWish={handleToggleWish}
            onLoan={() => setOpenLoanDialog(true)}
            onReturn={() => setOpenReturnDialog(true)}
          />
          <Dialog open={openReturnDialog} onOpenChange={setOpenReturnDialog}>
            <ReturnDialogContent
              onSubmit={() => {
                putLoanMutation.mutate(isbn)
                setOpenReturnDialog(false)
              }}
            />
          </Dialog>
          <Dialog open={openLoanDialog} onOpenChange={setOpenLoanDialog}>
            <LoanDialogContent
              onSubmit={() => {
                postLoanMutation.mutate(isbn)
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
