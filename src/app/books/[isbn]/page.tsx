'use client'

import { BookInfo } from '@/components/organisms/BookInfo'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { BookWishInfo } from '@/types/books'
import { toast } from 'sonner'
import { Heart } from 'lucide-react'
import { Dialog } from '@/components/ui/dialog'
import { Suspense, useEffect, useState } from 'react'
import { ReturnDialogContent } from '@/components/organisms/ReturnDialogContent'
import { LoanDialogContent } from '@/components/organisms/LoanDialogContent'
import { useQuery } from '@tanstack/react-query'
import { getBook } from '@/api/book'
import { useParams } from 'next/navigation'
import { AxiosError } from 'axios'
import { useCustomNavigation } from '@/hooks'
import { useUserStore } from '@/stores'

const mockWishData: BookWishInfo = {
  wished: false,
  wish_count: 5,
}

function Page() {
  const [openReturnDialog, setOpenReturnDialog] = useState<boolean>(false)
  const [openLoanDialog, setOpenLoanDialog] = useState<boolean>(false)

  const { navigateToAdminBooks, navigateToHome } = useCustomNavigation()
  const { userInfo } = useUserStore()
  const { role } = userInfo

  const params = useParams()
  const isbn = params.isbn as string

  const { data, error } = useQuery({
    queryKey: ['book', isbn],
    queryFn: () => getBook(isbn),
    retry: 0,
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
    toast(
      <span className="flex items-center gap-2">
        {wished ? (
          <>
            <Heart className="size-4 text-red-400" />
            お気に入りから削除しました。
          </>
        ) : (
          <>
            <Heart className="size-4 text-red-400" fill="#f87162" />
            お気に入りに追加しました。
          </>
        )}
      </span>,
      {
        duration: 2000,
      },
    )
  }

  return (
    <GnbTemplate>
      {data && (
        <>
          <BookInfo
            bookData={data.result}
            wishData={mockWishData}
            onToggleWish={handleToggleWish}
            onLoan={() => setOpenLoanDialog(true)}
            onReturn={() => setOpenReturnDialog(true)}
          />
          <Dialog open={openReturnDialog} onOpenChange={setOpenReturnDialog}>
            <ReturnDialogContent
              onSubmit={() => {
                setOpenReturnDialog(false)
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
