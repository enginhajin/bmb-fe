'use client'

import { BookApplication } from '@/components/organisms/BookApplication'
import { GnbTemplate } from '@/components/templates/GnbTemplate'

export default function AdminApplicationPage() {
  return (
    <GnbTemplate title="図書登録">
      <BookApplication />
    </GnbTemplate>
  )
}
