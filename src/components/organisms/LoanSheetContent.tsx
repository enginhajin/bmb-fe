import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { PATHS } from '@/constants/path'
import { BookDetailInfo, BookInfo, BookLentalInfo } from '@/types/books'
import { AdminUserInfo } from '@/types/user'
import Link from 'next/link'

export interface LoanSheetConentProps {
  data: BookInfo | BookDetailInfo | AdminUserInfo
}

const LoanSheetConent = ({ data }: LoanSheetConentProps) => {
  const { loans } = data
  let description: string | undefined

  if ('title' in data) {
    description = data.title
  } else {
    description = `${data.user_id} / ${data.nickname}`
  }

  return (
    <SheetContent className="w-10/12 max-w-[25rem] sm:max-w-[25rem]">
      <SheetHeader className="text-left">
        <SheetTitle className="font-bold">貸出状況</SheetTitle>
        <SheetDescription className="line-clamp-2">
          {description}
        </SheetDescription>
      </SheetHeader>
      <div className="mt-6 max-h-[calc(100%-6.5rem)] overflow-y-auto">
        {loans && loans.length > 0 ? (
          <ul>
            {loans.map((item: BookLentalInfo) => {
              const { id, user_id, nickname, loan_at, return_at, title, isbn } =
                item
              return (
                <li
                  key={id}
                  className="flex flex-wrap py-2 hover:bg-gray-100 [&:nth-child(n+2)]:border-t"
                >
                  {id && (
                    <div className="flex w-1/2 flex-col pr-1">
                      <strong className="text-sm text-tertiary">ID</strong>
                      <span>{user_id}</span>
                    </div>
                  )}
                  {nickname && (
                    <div className="flex w-1/2 flex-col pl-1">
                      <strong className="text-sm text-tertiary">
                        ニックネーム
                      </strong>
                      <span>{nickname}</span>
                    </div>
                  )}
                  {title && isbn && (
                    <div className="flex w-full flex-col">
                      <strong className="text-sm text-tertiary">図書名</strong>
                      <Link
                        href={`${PATHS.ADMIN_BOOKS}/${isbn}`}
                        className="underline hover:text-tertiary"
                      >
                        {title}
                      </Link>
                    </div>
                  )}
                  <div className="mt-2 flex w-1/2 flex-col pr-1">
                    <strong className="text-sm text-tertiary">貸出日</strong>
                    <span>{loan_at}</span>
                  </div>
                  <div className="mt-2 flex w-1/2 flex-col pl-1">
                    <strong className="text-sm text-tertiary">返却日</strong>
                    <span>{return_at || '-'}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <span className="mt-16 block text-center text-tertiary">
            まだ記録がありません。
          </span>
        )}
      </div>
    </SheetContent>
  )
}

export { LoanSheetConent }
