import { BookDown } from 'lucide-react'
import { BookDialogContent } from './BookDialogContent'

export interface LoanDialogContentProps {
  onSubmit: () => void
}

const LoanDialogContent = ({ onSubmit }: LoanDialogContentProps) => {
  return (
    <BookDialogContent
      title="図書を貸出しますか？"
      icon={<BookDown className="size-12 text-primary" />}
      onSubmit={onSubmit}
    />
  )
}

export { LoanDialogContent }
