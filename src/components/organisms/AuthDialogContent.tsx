import { UserX } from 'lucide-react'
import { DefaultDialogContent } from './DefaultDialogContent'

export interface AuthDialogContentProps {
  title: string
  onSubmit: () => void
}

const AuthDialogContent = ({ title, onSubmit }: AuthDialogContentProps) => {
  return (
    <DefaultDialogContent
      title={title}
      icon={<UserX className="size-12 text-primary" />}
      onSubmit={onSubmit}
      visibleCancleButton={false}
    />
  )
}

export { AuthDialogContent }
