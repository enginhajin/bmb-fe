import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'

export interface BookDialogContentProps {
  variant?: 'default' | 'destructive'
  title: string
  description?: string | ReactNode
  icon?: ReactNode
  onSubmit: () => void
  submitButtonText?: string
  cancelButtonText?: string
}

const BookDialogContent = ({
  variant = 'default',
  title,
  description,
  icon,
  onSubmit,
  submitButtonText = 'はい',
  cancelButtonText = 'いいえ',
}: BookDialogContentProps) => {
  return (
    <DialogContent className="w-96 max-w-[calc(100%-3rem)] rounded-md">
      <DialogHeader>
        <div className="mx-auto mb-4">{icon}</div>
        <DialogTitle className="text-center">{title}</DialogTitle>
        <DialogDescription className={`text-center ${description && 'pt-4'}`}>
          {description}
        </DialogDescription>
      </DialogHeader>
      <div className="mt-2 text-center">
        <Button variant={variant} type="submit" onClick={onSubmit}>
          {submitButtonText}
        </Button>
        <DialogClose asChild>
          <Button type="button" variant="secondary" className="ml-2">
            {cancelButtonText}
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  )
}

export { BookDialogContent }
