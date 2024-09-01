'use client'

import { BookInfo } from '@/components/organisms/BookInfo'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { Dialog } from '@/components/ui/dialog'
import { Suspense, useEffect, useState } from 'react'
import { ReturnDialogContent } from '@/components/organisms/ReturnDialogContent'
import { LoanDialogContent } from '@/components/organisms/LoanDialogContent'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBook, getWish } from '@/api/book'
import { useParams } from 'next/navigation'
import { AxiosError } from 'axios'
import { useCustomNavigation } from '@/hooks'
import { useUserStore } from '@/stores'
import { BookWishInfo } from '@/types/books'
import {
  useDeleteWishMutation,
  usePostLoanMutation,
  usePostWishMutation,
  usePutLoanMutation,
} from '@/mutations'

function Page() {
  const [currentWishData, setCurrentWishData] = useState<BookWishInfo>({
    wish_count: 0,
    wished: false,
  })
  const [openReturnDialog, setOpenReturnDialog] = useState<boolean>(false)
  const [openLoanDialog, setOpenLoanDialog] = useState<boolean>(false)

  const queryClient = useQueryClient()
  const { navigateToAdminBooks, navigateToHome } = useCustomNavigation()
  const { userInfo } = useUserStore()
  const { role } = userInfo

  const params = useParams()
  const isbn = params.isbn as string

  const { data, error } = useQuery({
    queryKey: ['book', isbn],
    queryFn: () => getBook(isbn),
    retry: 0,
    staleTime: 0,
  })

  const { data: wishData } = useQuery({
    queryKey: ['wish', isbn],
    queryFn: () => getWish(isbn),
    retry: 0,
    staleTime: 0,
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
      if (error instanceof AxiosError && error.response?.status === 404) {
        // 나중에 수정 필요 (ErrorCode 정리 후)
        alert('該当する図書がありません。ホームに移動します。')
        if (role === 'USER') {
          navigateToHome()
        } else {
          navigateToAdminBooks()
        }
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
    </GnbTemplate>
  )
}

export default function BookPage() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  )
}
