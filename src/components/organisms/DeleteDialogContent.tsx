import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { BookX } from 'lucide-react'
import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface DeleteDialogContentProps {
  title: string
  icon?: ReactNode
  setOpenDialog: Dispatch<SetStateAction<boolean>>
}

const DeleteDialogContent = ({
  title,
  icon,
  setOpenDialog,
}: DeleteDialogContentProps) => {
  return (
    <DialogContent className="max-w-96">
      <DialogHeader>
        <div className="mx-auto mb-4">
          {icon || <BookX className="size-12 text-destructive" />}
        </div>
        <DialogTitle className="text-center">{title}</DialogTitle>
      </DialogHeader>
      <div className="mt-2 text-center">
        <Button
          variant="destructive"
          type="submit"
          onClick={() => setOpenDialog(false)}
        >
          はい
        </Button>
        <DialogClose asChild>
          <Button type="button" variant="secondary" className="ml-2">
            いいえ
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  )
}

export { DeleteDialogContent }
