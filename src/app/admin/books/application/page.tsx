'use client'

import { ApplicationDialogContent } from '@/components/organisms/ApplicationDialogContent'
import { BookApplication } from '@/components/organisms/BookApplication'
import { GnbTemplate } from '@/components/templates/GnbTemplate'
import { Dialog } from '@/components/ui/dialog'
import { BookApplicationInfo } from '@/types/books'
import { useState } from 'react'

export default function AdminApplicationPage() {
  const [openApplicationDialog, setOpenApplicationDialog] =
    useState<boolean>(false)

  const handleSubmit = (value: BookApplicationInfo) => {
    setOpenApplicationDialog(true)
    return value
  }

  return (
    <GnbTemplate title="図書登録">
      <BookApplication onSubmit={handleSubmit} />
      <Dialog
        open={openApplicationDialog}
        onOpenChange={setOpenApplicationDialog}
      >
        <ApplicationDialogContent
          onSubmit={() => {
            setOpenApplicationDialog(false)
          }}
        />
      </Dialog>
    </GnbTemplate>
  )
}
