import { AdminUserListInfo } from '@/types/user'
import { Button } from '@/components/ui/button'

export interface UsersListViewProps {
  data: AdminUserListInfo
  onOpenLoanSheet: (user_id: string) => void
}

const UsersListView = ({ data, onOpenLoanSheet }: UsersListViewProps) => {
  return (
    <div className="mx-auto w-full max-w-screen-md">
      <ul className="-mx-3 flex w-[calc(100%+1.5rem)] flex-wrap">
        {data.users.map((item) => {
          const { nickname, user_id, created_at } = item
          return (
            <li key={user_id} className="w-full p-3">
              <div className="flex items-center justify-between rounded-md border p-4">
                <ul className="text-sm text-tertiary md:flex">
                  <li className="md:w-40">
                    <strong className="inline-block w-14 flex-shrink-0 md:mr-2 md:w-auto">
                      会員ID
                    </strong>
                    <span>{user_id}</span>
                  </li>
                  <li className="mt-1 md:ml-3 md:mt-0 md:w-40">
                    <strong className="inline-block w-14 flex-shrink-0 md:mr-2 md:w-auto">
                      名前
                    </strong>
                    <span>{nickname}</span>
                  </li>
                  <li className="mt-1 md:ml-3 md:mt-0 md:w-40">
                    <strong className="inline-block w-14 flex-shrink-0 md:mr-2 md:w-auto">
                      登録日
                    </strong>
                    <span>{created_at}</span>
                  </li>
                </ul>
                <Button
                  variant="secondary"
                  size="sm"
                  className="px-4"
                  onClick={() => {
                    onOpenLoanSheet(user_id)
                  }}
                >
                  貸出状況
                </Button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { UsersListView }
