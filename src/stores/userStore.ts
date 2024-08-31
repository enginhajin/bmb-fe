import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { UserInfo } from '@/types/user'

interface UserInfoState {
  userInfo: UserInfo
}

interface UserInfoActions {
  setUserInfo: (data: UserInfo) => void
  deleteUserInfo: () => void
}

const defaultState: UserInfo = {
  user_id: '',
  nickname: '',
  role: 'USER',
}

export const useUserStore = create(
  persist<UserInfoState & UserInfoActions>(
    (set) => ({
      userInfo: defaultState,
      setUserInfo: (data: UserInfo) => {
        set({ userInfo: data })
      },
      deleteUserInfo: () => {
        set({ userInfo: defaultState })
      },
    }),
    {
      name: 'userInfo',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
