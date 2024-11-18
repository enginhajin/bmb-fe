import { SearchInfo, UserSearchCategory } from '@/types/books'
import { useEffect, useState } from 'react'
import { userSelectItems } from '@/constants/search'
import useCustomSearchParams from './useCustomSearchParams'

export interface useCustomSearchUsersProps {
  handlePageChange: (page: number) => void
}

const useCustomSearchUsers = ({
  handlePageChange,
}: useCustomSearchUsersProps) => {
  const { searchParams, setSearchParams } = useCustomSearchParams()

  const [currentSearchData, setSearchData] = useState<SearchInfo>({
    category: userSelectItems.some(
      (item) => item.category === searchParams.category,
    )
      ? (searchParams.category as UserSearchCategory)
      : 'ALL',
    keyword: searchParams.keyword || '',
  })
  const handleSearch = (data: SearchInfo) => {
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
        category: userSelectItems.some(
          (item) => item.category === searchParams.category,
        )
          ? (searchParams.category as UserSearchCategory)
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

export default useCustomSearchUsers
