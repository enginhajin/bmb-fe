import { useEffect, useState } from 'react'
import useCustomSearchParams from './useCustomSearchParams'

const useCustomPagination = (total_pages: number) => {
  const { searchParams, setSearchParams } = useCustomSearchParams()
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.page) || 1,
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    setSearchParams({
      ...searchParams,
      page: String(
        currentPage < 1 || currentPage > total_pages ? 1 : currentPage,
      ),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return {
    currentPage,
    handlePageChange,
  }
}

export default useCustomPagination
