import { BookWishListInfo } from '@/types/books'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

export interface BooksListViewProps {
  data: BookWishListInfo
  setOpenDialog: Dispatch<SetStateAction<boolean>>
}

const BooksListView = ({ data, setOpenDialog }: BooksListViewProps) => {
  const router = useRouter()
  const navigateToLoanPage = () => {
    router.push('/books/1')
  }

  return (
    <ul className="-m-3 flex flex-wrap">
      {data.wishes.map((item) => {
        const { id, title, thumbnail, author_name, publisher_name } = item

        return (
          <li key={id} className="w-full p-3">
            <div className="flex size-full flex-wrap rounded-md border">
              <Link
                href={`/books/${id}`}
                className="block w-2/6 flex-shrink-0 hover:opacity-70 xs:w-[9rem]"
              >
                <Image
                  src={thumbnail}
                  width={128}
                  height={182}
                  alt="book1"
                  className="aspect-[7/10] size-full"
                />
              </Link>
              <div className="flex w-4/6 flex-col p-4 xs:w-[calc(100%-9rem)] lg:flex-row">
                <div className="w-full">
                  <Link
                    href={`/books/${id}`}
                    className="text-md line-clamp-1 font-normal hover:text-primary hover:underline min-[375px]:line-clamp-2 md:text-lg"
                  >
                    {title}
                  </Link>
                  <ul className="mt-1 w-full text-xs text-tertiary xs:mt-4 xs:text-sm sm:text-sm md:mt-6 md:text-base">
                    <li className="inline-block xs:flex xs:w-full">
                      <strong className="hidden w-14 flex-shrink-0 xs:inline-block">
                        著者
                      </strong>
                      <span>{author_name}</span>
                    </li>
                    <li className="mt-1 inline-block md:flex md:w-full">
                      <strong className="hidden w-14 flex-shrink-0 xs:inline-block">
                        出版社
                      </strong>
                      <span className="mx-1 xs:hidden">/</span>
                      <span>{publisher_name}</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-2 flex w-full flex-grow items-end justify-end lg:w-28 lg:flex-shrink-0 lg:flex-col lg:items-center lg:justify-center">
                  <Button
                    size="sm"
                    className="w-1/2 max-w-28 lg:w-full"
                    onClick={navigateToLoanPage}
                  >
                    貸出
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2 w-1/2 max-w-28 border-2 border-destructive text-destructive hover:bg-destructive hover:text-white lg:ml-0 lg:mt-2 lg:w-full"
                    onClick={() => setOpenDialog(true)}
                  >
                    削除
                  </Button>
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
