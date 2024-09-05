import { BookSearchInfo, SearchCategory } from '@/types/books'
import { useEffect, useState } from 'react'
import { selectItems } from '@/components/molecules/SearchInput'
import useCustomSearchParams from './useCustomSearchParams'

export interface useCustomSearchBooksProps {
  handlePageChange: (page: number) => void
}

const useCustomSearchBooks = ({
  handlePageChange,
}: useCustomSearchBooksProps) => {
  const { searchParams, setSearchParams } = useCustomSearchParams()

  const [currentSearchData, setSearchData] = useState<BookSearchInfo>({
    category: selectItems.some(
      (item) => item.category === searchParams.category,
    )
      ? (searchParams.category as SearchCategory)
      : 'ALL',
    keyword: searchParams.keyword || '',
  })
  const handleSearch = (data: BookSearchInfo) => {
    setSearchData(data)
    handlePageChange(1)
  }

  useEffect(() => {
    const { category, keyword } = currentSearchData
    setSearchParams({
      page: '',
      category,
      keyword,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSearchData])

  useEffect(() => {
    if (searchParams.keyword !== currentSearchData.keyword) {
      setSearchData({
        category: selectItems.some(
          (item) => item.category === searchParams.category,
        )
          ? (searchParams.category as SearchCategory)
          : 'ALL',
        keyword: searchParams.keyword || '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.keyword])

  return {
    currentSearchData,
    handleSearch,
    searchParams,
  }
}

export default useCustomSearchBooks
