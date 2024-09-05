import { useEffect, useState } from 'react'
import useCustomSearchParams from './useCustomSearchParams'

const useCustomPagination = () => {
  const { searchParams, setSearchParams } = useCustomSearchParams()
  const [totalPage, setTotalPage] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.page) || 1,
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    const page = Number(searchParams.page) || 1
    setCurrentPage(page)
  }, [searchParams.page])

  useEffect(() => {
    const validPage = Math.max(1, Math.min(currentPage, totalPage))
    setSearchParams({
      ...searchParams,
      page: String(validPage),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return {
    currentPage,
    handlePageChange,
    setTotalPage,
  }
}

export default useCustomPagination
