import { BookUp } from 'lucide-react'
import { DefaultDialogContent } from './DefaultDialogContent'

export interface ReturnDialogContentProps {
  onSubmit: () => void
}

const ReturnDialogContent = ({ onSubmit }: ReturnDialogContentProps) => {
  return (
    <DefaultDialogContent
      title="図書を返却しますか？"
      icon={<BookUp className="size-12 text-primary" />}
      onSubmit={onSubmit}
    />
  )
}

export { ReturnDialogContent }
