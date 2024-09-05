import { useEffect, useState } from 'react'
import { useUserStore } from '@/stores'
import { UserRole } from '@/types/user'
import { getTokenInfo } from '@/lib/utils'
import useCustomNavigation from './useCustomNavigation'

interface UseCustomCheckRoleDialogProps {
  requiredRole: UserRole
}

const useCustomCheckRoleDialog = ({
  requiredRole,
}: UseCustomCheckRoleDialogProps) => {
  const { userInfo } = useUserStore()
  const { navigateToSignIn, navigateToHome } = useCustomNavigation()
  const [isUser, setIsUser] = useState<boolean | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')

  const handleDialogSubmit = () => {
    setDialogOpen(false)

    if (requiredRole === 'USER' && !isUser) {
      navigateToSignIn()
    } else if (requiredRole === 'ADMIN') {
      if (!isUser) {
        navigateToSignIn()
      } else if (!isAdmin) {
        navigateToHome()
      }
    }
  }

  useEffect(() => {
    const tokenInfo = getTokenInfo()
    if (!!tokenInfo && tokenInfo.accessToken !== null) {
      setIsUser(true)
    } else {
      setIsUser(false)
      setDialogTitle('会員専用ページです。')
      setDialogOpen(true)
    }
  }, [])

  useEffect(() => {
    if (!!isUser && requiredRole === 'ADMIN') {
      if (userInfo.role === requiredRole) {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
        setDialogTitle('管理者専用ページです。')
        setDialogOpen(true)
      }
    }
  }, [isUser, requiredRole, userInfo.role])

  return {
    isUser,
    isAdmin,
    dialogOpen,
    dialogTitle,
    setDialogOpen,
    handleDialogSubmit,
  }
}

export default useCustomCheckRoleDialog
