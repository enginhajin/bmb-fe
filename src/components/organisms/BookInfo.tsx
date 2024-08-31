import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { BookDetailInfo, BookWishInfo } from '@/types/books'
import { Badge } from '@/components/ui/badge'

export interface BookInfoProps {
  bookData: BookDetailInfo
  wishData: BookWishInfo
  onToggleWish?: (wished: boolean) => void
  onLoan?: () => void
  onReturn?: () => void
  onOpenLoanSheet?: () => void
}

const BookInfo = ({
  bookData,
  wishData,
  onToggleWish,
  onLoan,
  onReturn,
  onOpenLoanSheet,
}: BookInfoProps) => {
  const router = useRouter()
  const {
    isbn,
    title,
    description,
    thumbnail,
    author_name,
    publisher_name,
    published_date,
    status,
  } = bookData
  const { wished, wish_count } = wishData

  const navigateToBack = () => {
    router.back()
  }

  return (
    <>
      <div className="sm:flex">
        <div className="w-full flex-shrink-0 sm:w-52">
          <Image
            src={thumbnail}
            width={128}
            height={182}
            alt="book1"
            className="mx-auto aspect-[7/10] w-10/12 max-w-sm sm:w-full"
          />
        </div>
        <div className="mt-6 sm:mt-0 sm:w-full sm:pl-6">
          <h1 className="text-xl font-semibold">{title}</h1>
          <ul className="mt-6">
            <li className="flex">
              <strong className="w-24 flex-shrink-0">著者</strong>
              <span>{author_name}</span>
            </li>
            <li className="mt-1 flex">
              <strong className="w-24 flex-shrink-0">出版社</strong>
              <span>{publisher_name}</span>
            </li>
            <li className="mt-1 flex">
              <strong className="w-24 flex-shrink-0">発売日</strong>
              <span>{published_date}</span>
            </li>
            <li className="mt-1 flex">
              <strong className="w-24 flex-shrink-0">ISBN</strong>
              <span>{isbn}</span>
            </li>
            <li className="mt-1 flex">
              <strong className="w-24 flex-shrink-0">状態</strong>
              <span>
                <Badge
                  variant={status === 'AVAILABLE' ? 'default' : 'tertiary'}
                >
                  {status === 'AVAILABLE' ? '保有中' : '貸出中'}
                </Badge>
              </span>
            </li>
          </ul>
          <div className="mt-6 flex gap-2 sm:mt-10">
            {onToggleWish ? (
              <Button
                variant="outline"
                className={`group w-1/2 border-2 text-red-400 hover:border-red-400 hover:bg-transparent hover:text-red-400 md:w-40 ${wished && 'border-red-400'}`}
                onClick={() => {
                  onToggleWish(wished)
                }}
              >
                <span className="relative mr-1">
                  <Heart />
                  <Heart
                    fill="#f87162"
                    className={`absolute left-0 top-0 transition-[opacity] duration-200 group-hover:opacity-100 ${wished ? 'opacity-100' : 'opacity-0'}`}
                  />
                </span>
                <span>{wish_count}</span>
              </Button>
            ) : (
              <div className="flex items-center pl-4 pr-6 text-red-400">
                <Heart />
                <span className="ml-1">{wish_count}</span>
              </div>
            )}
            {(onReturn || onLoan) && (
              <Button
                variant={status === 'CHECKED_OUT' ? 'outline' : 'default'}
                className={`w-1/2 md:w-40 ${status === 'UNAVAILABLE' && 'bg-tertiary'} ${status === 'CHECKED_OUT' && 'border-2 border-primary text-primary hover:bg-primary hover:text-white'}`}
                disabled={status === 'UNAVAILABLE'}
                onClick={() => {
                  if (status === 'CHECKED_OUT' && onReturn) {
                    onReturn()
                  } else if (onLoan) {
                    onLoan()
                  }
                }}
              >
                {status === 'AVAILABLE'
                  ? '貸出'
                  : status === 'CHECKED_OUT'
                    ? '返却'
                    : '貸出不可'}
              </Button>
            )}
            {onOpenLoanSheet && (
              <Button
                variant="secondary"
                size="sm"
                className="w-1/2 max-w-28 lg:w-full"
                onClick={() => {
                  onOpenLoanSheet()
                }}
              >
                貸出状況
              </Button>
            )}
          </div>
        </div>
      </div>
      <section>
        <h2 className="mt-10 border-b pb-2 text-lg font-bold">内容紹介</h2>
        <div className="mt-4 whitespace-pre-line">{description}</div>
      </section>
      <div className="mt-10 text-center">
        <Button variant="secondary" onClick={navigateToBack} className="w-28">
          リストへ
        </Button>
      </div>
    </>
  )
}

export { BookInfo }
