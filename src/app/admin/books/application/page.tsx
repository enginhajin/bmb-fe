'use client'

import { AuthDialogContent } from '@/components/organisms/AuthDialogContent'
import { BookApplication } from '@/components/organisms/BookApplication'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { Dialog } from '@/components/ui/dialog'
import { useCustomCheckRoleDialog } from '@/hooks'

export default function AdminApplicationPage() {
  const {
    isAdmin,
    dialogOpen,
    dialogTitle,
    setDialogOpen,
    handleDialogSubmit,
  } = useCustomCheckRoleDialog({ requiredRole: 'ADMIN' })

  return (
    <GnbTemplate title="図書登録">
      {isAdmin && <BookApplication />}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AuthDialogContent title={dialogTitle} onSubmit={handleDialogSubmit} />
      </Dialog>
    </GnbTemplate>
  )
}
