import { BookPlus } from 'lucide-react'
import { DefaultDialogContent } from './DefaultDialogContent'

export interface ApplicationDialogContentProps {
  onSubmit: () => void
}

const ApplicationDialogContent = ({
  onSubmit,
}: ApplicationDialogContentProps) => {
  return (
    <DefaultDialogContent
      title="図書を登録しますか？"
      icon={<BookPlus className="size-12 text-primary" />}
      onSubmit={onSubmit}
    />
  )
}

export { ApplicationDialogContent }
