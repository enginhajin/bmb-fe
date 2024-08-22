import { create } from 'zustand'

interface GnbState {
  isExpand: boolean
  isLgExpand: boolean
}

interface GnbActions {
  setIsExpand: (value: boolean) => void
  setIsLgExpand: (value: boolean) => void
}

const defaultState = {
  isExpand: false,
  isLgExpand: true,
}

export const useGnbStore = create<GnbState & GnbActions>((set) => ({
  ...defaultState,
  setIsExpand: (value: boolean) => {
    set({ isExpand: value })
  },
  setIsLgExpand: (value: boolean) => {
    set({ isLgExpand: value })
  },
}))
