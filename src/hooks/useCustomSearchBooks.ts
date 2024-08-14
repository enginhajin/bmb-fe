import { BookSearchInfo, SearchCategory } from '@/types/books'
import { useEffect, useState } from 'react'
import { selectItems } from '@/components/molecules/SearchInput'
import useCustomSearchParams from './useCustomSearchParams'

const useCustomSearchBooks = () => {
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
  }

  useEffect(() => {
    const { category, keyword } = currentSearchData
    setSearchParams({
      ...searchParams,
      category,
      keyword,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSearchData])

  return {
    currentSearchData,
    handleSearch,
  }
}

export default useCustomSearchBooks
