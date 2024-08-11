import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { BookUp } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export interface ReturnDialogContentProps {
  setOpenDialog: Dispatch<SetStateAction<boolean>>
}

const ReturnDialogContent = ({ setOpenDialog }: ReturnDialogContentProps) => {
  return (
    <DialogContent className="max-w-96">
      <DialogHeader>
        <div className="mx-auto mb-4">
          <BookUp className="size-12 text-primary" />
        </div>
        <DialogTitle className="text-center">図書を返却しますか？</DialogTitle>
      </DialogHeader>
      <div className="mt-2 text-center">
        <Button type="submit" onClick={() => setOpenDialog(false)}>
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

export { ReturnDialogContent }
