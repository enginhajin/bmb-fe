'use client'

import { PATHS } from '@/constants/path'
import { useCustomWindowSize } from '@/hooks'
import { usePostSignOutMutation } from '@/mutations'
import { useGnbStore, useUserStore } from '@/stores'
import {
  Book,
  Bookmark,
  CircleUserRound,
  Heart,
  Menu,
  SquarePlus,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

interface GnbItem {
  href: string
  label: string
  icon: React.ReactNode
}

const gnbItems: GnbItem[] = [
  {
    href: PATHS.HOME,
    label: '図書リスト',
    icon: <Book />,
  },
  { href: PATHS.WISH, label: 'お気に入りリスト', icon: <Heart /> },
  { href: PATHS.LOAN, label: '貸出リスト', icon: <Bookmark /> },
]

const adminGnbItems: GnbItem[] = [
  {
    href: PATHS.ADMIN_BOOKS,
    label: '図書リスト',
    icon: <Book />,
  },
  {
    href: PATHS.ADMIN_APPLICATION,
    label: '図書登録',
    icon: <SquarePlus />,
  },
]

const Gnb = () => {
  const pathname = usePathname()
  const { userInfo } = useUserStore()
  const { role, nickname } = userInfo
  const { isExpand, isLgExpand, setIsExpand, setIsLgExpand } = useGnbStore()
  const { width } = useCustomWindowSize()

  const menuItems = useMemo(() => {
    return role === 'ADMIN' ? adminGnbItems : gnbItems
  }, [role])

  const toggleExpand = () => {
    if (width && width > 1024) {
      setIsLgExpand(!isLgExpand)
      if (isExpand) setIsExpand(false) // lg->md 閉めたらmd以下でも閉めるように
    } else {
      setIsExpand(!isExpand)
      if (!isExpand) setIsLgExpand(true) // md->lg 開けたままサイズ調整しずっと開けてる
      if (isExpand) setIsLgExpand(false) // md->lg 閉めたままサイズ調整しずっと閉めてる
    }
  }

  const postSignOutMutation = usePostSignOutMutation()

  return (
    <div
      className={`fixed -left-56 top-0 z-40 h-screen w-56 flex-shrink-0 bg-primary transition-[left] duration-500 lg:left-0 lg:[&+div]:pl-56 ${isExpand && 'left-0'} ${!isLgExpand && 'lg:!-left-56 lg:[&+div]:!pl-0'}`}
    >
      <button
        type="button"
        className={`absolute right-[-3.5rem] top-4 flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border border-solid border-input bg-white shadow-md transition-[right] duration-500 lg:right-[-1.5rem] ${isExpand && '!right-[-1.5rem]'} ${!isLgExpand && 'lg:right-[-3.5rem]'}`}
        onClick={toggleExpand}
      >
        <Menu className="shrink-0 text-primary" />
        <span className="mr-[-1px] text-[1px] text-white">toggle</span>
      </button>
      <div className="size-full overflow-y-auto px-5 py-8">
        <header>
          <Link
            href={role === 'ADMIN' ? PATHS.ADMIN_BOOKS : PATHS.HOME}
            className="relative inline-flex items-center text-white"
          >
            <Image
              src="/img/logo/logo-bmb-white.png"
              width={26}
              height={42}
              alt="bmb"
              className="relative top-[-0.375rem]"
            />
            <span className="ml-4 text-2xl font-extrabold">bmb</span>
          </Link>
        </header>
        <div className="mt-5 flex text-gray-100">
          <CircleUserRound className="size-5 flex-shrink-0" />
          <span className="ml-1 line-clamp-1 text-sm">{nickname}</span>
        </div>
        <nav className="mt-5">
          <ul className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const { href, label, icon } = item
              const isActive =
                pathname === href ||
                (label === '図書リスト' && pathname === '/')

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`-mx-2 flex items-center rounded-md p-2 hover:text-white ${
                      isActive ? 'bg-[#0f9f71] text-white' : 'text-white/80'
                    }`}
                    onClick={() => {
                      if (width && width <= 1024) {
                        setIsExpand(false)
                      }
                    }}
                  >
                    <span className="mr-2 [&>svg]:w-4">{icon}</span>
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="mt-8">
            <button
              type="button"
              className="text-sm text-white hover:underline"
              onClick={() => {
                postSignOutMutation.mutate()
                setIsExpand(false)
              }}
            >
              サインアウト
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}

export { Gnb }
