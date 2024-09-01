import { BookListInfo } from '@/types/books'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart } from 'lucide-react'
import { PATHS } from '@/constants/path'

export interface BooksListViewProps {
  data: BookListInfo
  onDelete?: (isbn: string) => void
  onLoan?: () => void
  onReturn?: () => void
  onOpenLoanSheet?: (isbn: string) => void
  isVisibleBadge?: boolean
  isAdmin?: boolean
}

const BooksListView = ({
  data,
  onDelete,
  onLoan,
  onReturn,
  onOpenLoanSheet,
  isVisibleBadge = false,
  isAdmin = false,
}: BooksListViewProps) => {
  return (
    <ul className="-m-3 flex flex-wrap">
      {data.books.map((item) => {
        const {
          isbn,
          title,
          thumbnail,
          author_name,
          publisher_name,
          status,
          loan_at,
          return_at,
          wish_count,
        } = item
        return (
          <li key={isbn} className="w-full p-3">
            <div className="flex size-full flex-wrap rounded-md border">
              <Link
                href={
                  isAdmin
                    ? `${PATHS.ADMIN_BOOKS}/${isbn}`
                    : `${PATHS.BOOKS}/${isbn}`
                }
                className="relative block w-2/6 flex-shrink-0 hover:opacity-70 xs:w-[9rem]"
              >
                <Image
                  src={thumbnail}
                  width={128}
                  height={182}
                  alt="book1"
                  className="aspect-[7/10] size-full"
                />
                {isVisibleBadge && (
                  <Badge
                    variant={status === 'AVAILABLE' ? 'default' : 'tertiary'}
                    className="absolute left-2 top-2"
                  >
                    {status === 'AVAILABLE' ? '保有中' : '貸出中'}
                  </Badge>
                )}
              </Link>
              <div className="flex w-4/6 flex-col p-4 xs:w-[calc(100%-9rem)] lg:flex-row">
                <div className="w-full">
                  <Link
                    href={
                      isAdmin
                        ? `${PATHS.ADMIN_BOOKS}/${isbn}`
                        : `${PATHS.BOOKS}/${isbn}`
                    }
                    className={`text-md line-clamp-1 font-normal hover:text-primary hover:underline min-[375px]:line-clamp-2 md:text-lg ${onReturn && 'min-[375px]:line-clamp-1 md:line-clamp-2'}`}
                  >
                    {title}
                  </Link>
                  <ul
                    className={`mt-1 w-full text-xs text-tertiary xs:mt-4 xs:text-sm sm:text-sm md:mt-6 md:text-base ${onReturn && 'flex-wrap md:flex'}`}
                  >
                    <li
                      className={`inline-block xs:flex xs:w-full ${onReturn && 'md:w-1/2'}`}
                    >
                      <strong className="hidden w-14 flex-shrink-0 xs:inline-block">
                        著者
                      </strong>
                      <span>{author_name}</span>
                    </li>
                    <li
                      className={`mt-1 inline-block xs:flex xs:w-full ${onReturn && 'mt-0 md:w-1/2'}`}
                    >
                      <strong className="hidden w-14 flex-shrink-0 xs:inline-block">
                        出版社
                      </strong>
                      <span className="mx-1 xs:hidden">/</span>
                      <span>{publisher_name}</span>
                    </li>
                    {loan_at && (
                      <li
                        className={`mt-1 inline-block xs:flex xs:w-full ${onReturn && 'mt-0 md:mt-1 md:w-1/2'}`}
                      >
                        <strong className="hidden w-14 flex-shrink-0 xs:inline-block">
                          貸出日
                        </strong>
                        <span className="mx-1 xs:hidden">/</span>
                        <span>{loan_at}</span>
                      </li>
                    )}
                    {return_at && (
                      <li
                        className={`mt-1 inline-block xs:flex xs:w-full ${onReturn && 'mt-0 md:mt-1 md:w-1/2'}`}
                      >
                        <strong className="hidden w-14 flex-shrink-0 xs:inline-block">
                          返却日
                        </strong>
                        <span className="mx-1 xs:hidden">/</span>
                        <span>{return_at}</span>
                      </li>
                    )}
                    {wish_count !== undefined && (
                      <li
                        className={`mt-1 inline-block xs:flex xs:w-full ${onReturn && 'mt-0 md:mt-1 md:w-1/2'}`}
                      >
                        <strong className="hidden w-14 flex-shrink-0 items-center xs:flex">
                          <Heart
                            className="text-red-400"
                            width={16}
                            height={16}
                          />
                        </strong>
                        <span className="mx-1 xs:hidden">/</span>
                        <span className="relative pl-4 xs:pl-0">
                          <span className="absolute left-0 top-1/2 -mt-[0.375rem] xs:hidden">
                            <Heart
                              className="text-red-400"
                              width={12}
                              height={12}
                            />
                          </span>
                          {wish_count}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="mt-2 flex w-full flex-grow items-end justify-end lg:w-28 lg:flex-shrink-0 lg:flex-col lg:items-center lg:justify-center">
                  {(onLoan || onReturn) && (
                    <Button
                      variant={status === 'CHECKED_OUT' ? 'outline' : 'default'}
                      size="sm"
                      className={`w-1/2 max-w-28 lg:w-full ${status === 'UNAVAILABLE' && 'bg-tertiary'} ${status === 'CHECKED_OUT' && 'border-2 border-primary text-primary hover:bg-primary hover:text-white'}`}
                      disabled={status === 'UNAVAILABLE'}
                      onClick={() => {
                        if (status === 'CHECKED_OUT' && onReturn) {
                          onReturn()
                        }
                        if (status === 'AVAILABLE' && onLoan) {
                          onLoan()
                        }
                      }}
                    >
                      {status === 'AVAILABLE'
                        ? '貸出'
                        : status === 'CHECKED_OUT'
                          ? '返却'
                          : '不可'}
                    </Button>
                  )}
                  {onOpenLoanSheet && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-1/2 max-w-28 lg:w-full"
                      onClick={() => {
                        onOpenLoanSheet(isbn)
                      }}
                    >
                      貸出状況
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2 w-1/2 max-w-28 border-2 border-destructive text-destructive hover:bg-destructive hover:text-white lg:ml-0 lg:mt-2 lg:w-full"
                      onClick={() => onDelete(isbn)}
                    >
                      削除
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export { BooksListView }
