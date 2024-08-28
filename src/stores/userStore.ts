import { create } from 'zustand'
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

export const useUserStore = create<UserInfoState & UserInfoActions>((set) => ({
  userInfo: defaultState,
  setUserInfo: (data: UserInfo) => {
    set({ userInfo: data })
  },
  deleteUserInfo: () => {
    set({ userInfo: defaultState })
  },
}))
