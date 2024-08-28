import { ReactNode } from 'react'
import { BookX } from 'lucide-react'
import { DefaultDialogContent } from './DefaultDialogContent'

export interface DeleteDialogContentProps {
  title?: string
  description?: string | ReactNode
  onSubmit: () => void
}

const DeleteDialogContent = ({
  title,
  description,
  onSubmit,
}: DeleteDialogContentProps) => {
  return (
    <DefaultDialogContent
      variant="destructive"
      title={title || 'お気に入りから削除しますか？'}
      description={description}
      icon={<BookX className="size-12 text-destructive" />}
      onSubmit={onSubmit}
    />
  )
}

export { DeleteDialogContent }
