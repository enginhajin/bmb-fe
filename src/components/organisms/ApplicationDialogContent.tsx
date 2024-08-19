import { BookPlus } from 'lucide-react'
import { BookDialogContent } from './BookDialogContent'

export interface ApplicationDialogContentProps {
  onSubmit: () => void
}

const ApplicationDialogContent = ({
  onSubmit,
}: ApplicationDialogContentProps) => {
  return (
    <BookDialogContent
      title="図書を登録しますか？"
      icon={<BookPlus className="size-12 text-primary" />}
      onSubmit={onSubmit}
    />
  )
}

export { ApplicationDialogContent }
