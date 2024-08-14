import { BookX } from 'lucide-react'
import { BookDialogContent } from './BookDialogContent'

export interface DeleteDialogContentProps {
  onSubmit: () => void
}

const DeleteDialogContent = ({ onSubmit }: DeleteDialogContentProps) => {
  return (
    <BookDialogContent
      variant="destructive"
      title="お気に入りから削除しますか？"
      icon={<BookX className="size-12 text-destructive" />}
      onSubmit={onSubmit}
    />
  )
}

export { DeleteDialogContent }
