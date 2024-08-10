import { BookItem, BookListData } from '@/types/books'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

export interface BooksListProps {
  data: BookListData
}

const BookList = ({ data }: BooksListProps) => {
  return (
    <ul className="-m-3 flex flex-wrap outline-blue-200">
      {data.books.map((item: BookItem) => {
        const { isbn, title, author_name, status, wished } = item
        return (
          <li
            key={isbn}
            className="w-6/12 p-3 outline-red-200 sm:w-4/12 md:w-3/12 lg:w-2/12"
          >
            <Link
              href={`/books/${isbn}`}
              target="_blank"
              className="block w-full hover:opacity-70"
            >
              <Image
                src="/img/book/book_thumbnail.jpg"
                width={128}
                height={182}
                alt="book1"
                className="aspect-[7/10] w-full"
              />
            </Link>
            <div>
              <Link
                href={`/books/${isbn}`}
                target="_blank"
                className="mt-2 line-clamp-2 h-10 text-sm font-normal hover:text-primary hover:underline"
              >
                {title}
              </Link>
              <span className="mt-2 line-clamp-1 text-xs text-tertiary">
                {author_name}
              </span>
              <div className="mt-1 flex justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  className="group relative w-auto pl-0 hover:bg-transparent"
                >
                  <Heart className="absolute left-0 top-2 text-red-400" />
                  <Heart
                    fill="#f87162"
                    className={`absolute left-0 top-2 text-red-400 transition-[opacity] duration-200 group-hover:opacity-100 ${wished ? 'opacity-100' : 'opacity-0'}`}
                  />
                </Button>
                <Button
                  className={`mt-1 h-8 w-14 ${status === 'UNAVAILABLE' && 'bg-tertiary'}`}
                  disabled={status !== 'AVALIABLE'}
                >
                  {status === 'AVALIABLE'
                    ? '貸出'
                    : status === 'CHECKEDOUT'
                      ? '貸出中'
                      : '不可'}
                </Button>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export { BookList }
