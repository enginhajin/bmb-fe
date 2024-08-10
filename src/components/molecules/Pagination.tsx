import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { useEffect, useState } from 'react'

const LIMIT = 5

export interface PaginationProps {
  total_pages: number
  current_page: number
  onPageChange: (page: number) => void
}

const Pagination = ({
  total_pages,
  current_page,
  onPageChange,
}: PaginationProps) => {
  const [pageGroup, setPageGroup] = useState(1)

  const startPage = (pageGroup - 1) * LIMIT + 1
  const endPage = Math.min(total_pages, pageGroup * LIMIT)
  const isFirstPage = current_page === 1
  const isLastPage = current_page === total_pages

  useEffect(() => {
    setPageGroup(Math.ceil(current_page / LIMIT))
  }, [current_page])

  const renderPageLinks = () => {
    const pages = []
    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <PaginationItem key={page}>
          <PaginationLink
            isActive={page === current_page}
            onClick={() => onPageChange(page)}
            className="size-8 sm:size-10"
            href="#"
          >
            {page}
          </PaginationLink>
        </PaginationItem>,
      )
    }
    return pages
  }

  return (
    <PaginationContainer className="mt-12">
      <PaginationContent>
        {total_pages > 4 && (
          <PaginationItem>
            <Button
              onClick={() => onPageChange(1)}
              size="icon"
              variant="ghost"
              className="size-8 sm:size-10"
            >
              <ChevronsLeft className="w-4" />
            </Button>
          </PaginationItem>
        )}
        {total_pages > 2 && (
          <PaginationItem>
            <Button
              onClick={() => !isFirstPage && onPageChange(current_page - 1)}
              size="icon"
              variant="ghost"
              className="size-8 sm:size-10"
            >
              <ChevronLeft className="w-4" />
            </Button>
          </PaginationItem>
        )}
        {renderPageLinks()}
        {total_pages > 2 && (
          <PaginationItem>
            <Button
              onClick={() => !isLastPage && onPageChange(current_page + 1)}
              size="icon"
              variant="ghost"
              className="size-8 sm:size-10"
            >
              <ChevronRight className="w-4" />
            </Button>
          </PaginationItem>
        )}
        {total_pages > 4 && (
          <PaginationItem>
            <Button
              onClick={() => onPageChange(total_pages)}
              size="icon"
              variant="ghost"
              className="size-8 sm:size-10"
            >
              <ChevronsRight className="w-4" />
            </Button>
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationContainer>
  )
}

export { Pagination }
