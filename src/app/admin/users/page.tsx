'use client'

import { Suspense, useEffect, useState } from 'react'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import {
  useCustomCheckRoleDialog,
  useCustomPagination,
  useCustomSearchUsers,
} from '@/hooks'
import { Dialog } from '@/components/ui/dialog'
import { AuthDialogContent } from '@/components/organisms/AuthDialogContent'
import { UsersListView } from '@/components/organisms/UsersListView'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getAdminUserList } from '@/api/auth'
import { Sheet } from '@/components/ui/sheet'
import { LoanSheetConent } from '@/components/organisms/LoanSheetContent'
import { AdminUserInfo, AdminUserListInfo } from '@/types/user'
import { Pagination } from '@/components/molecules/Pagination'
import { SearchInput } from '@/components/molecules/SearchInput'
import { userSelectItems } from '@/constants/search'
import { handleBookListError } from '@/lib/utils'
import { ApiResponse } from '@/types/api'
import { AxiosError } from 'axios'

function Page() {
  const {
    isAdmin,
    dialogOpen,
    dialogTitle,
    setDialogOpen,
    handleDialogSubmit,
  } = useCustomCheckRoleDialog({
    requiredRole: 'ADMIN',
  })
  const { currentPage, handlePageChange, setTotalPage } = useCustomPagination()
  const { currentSearchData, handleSearch } = useCustomSearchUsers({
    handlePageChange,
  })
  const [openLoanSheet, setOpenLoanSheet] = useState<boolean>(false)
  const [currentLoanData, setCurrentLoanData] = useState<AdminUserInfo>()

  const {
    data,
    error,
  }: UseQueryResult<ApiResponse<AdminUserListInfo>, AxiosError> = useQuery({
    queryKey: ['adminusers', currentPage, currentSearchData],
    queryFn: () =>
      getAdminUserList({
        page: currentPage,
        size: 10,
        category: currentSearchData.category,
        keyword: currentSearchData.keyword,
      }),
    staleTime: 0,
    retry: 0,
    enabled: !!isAdmin,
  })

  const handleLoanSheetOpen = (user_id: string) => {
    const loans = data?.result.users.find(
      (item: AdminUserInfo) => item.user_id === user_id,
    )
    setCurrentLoanData(loans)
    setOpenLoanSheet(true)
  }

  useEffect(() => {
    if (data) setTotalPage(data.result.total_pages)
  }, [data, setTotalPage])

  useEffect(() => {
    if (error && error.response) {
      handleBookListError(error.response, handlePageChange)
    }
  }, [error, handlePageChange])

  return (
    <GnbTemplate
      title="会員リスト"
      headerContent={
        <SearchInput
          data={currentSearchData}
          onSearch={handleSearch}
          selectItems={userSelectItems}
        />
      }
    >
      {data && (
        <>
          <div className="mx-auto w-full max-w-screen-md text-sm">
            合計<strong>{data.result.total_items}</strong>名
          </div>
          <UsersListView
            data={data.result}
            onOpenLoanSheet={(user_id: string) => {
              handleLoanSheetOpen(user_id)
            }}
          />
          {data.result.users.length > 0 && (
            <Pagination
              total_pages={data.result.total_pages}
              current_page={currentPage}
              onPageChange={handlePageChange}
            />
          )}
          <Sheet open={openLoanSheet} onOpenChange={setOpenLoanSheet}>
            {currentLoanData && <LoanSheetConent data={currentLoanData} />}
          </Sheet>
        </>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AuthDialogContent title={dialogTitle} onSubmit={handleDialogSubmit} />
      </Dialog>
    </GnbTemplate>
  )
}

export default function AdminBookListPage() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  )
}
