'use client'

import { useWindowSize } from '@/hooks'
import { Book, Bookmark, Heart, Menu, SquarePlus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface GnbItem {
  href: string
  label: string
  icon: React.ReactNode
}

const GnbItems: GnbItem[] = [
  { href: '/', label: '図書リスト', icon: <Book /> },
  { href: '/mypage/wish', label: 'お気に入りリスト', icon: <Heart /> },
  { href: '/mypage/loan', label: '貸出リスト', icon: <Bookmark /> },
  { href: '/admin/books/application', label: '図書登録', icon: <SquarePlus /> },
]

const Gnb = () => {
  const pathname = usePathname()
  const [isExpand, setIsExpand] = useState<boolean>(false)

  const toggleExpand = () => {
    setIsExpand(!isExpand)
  }

  const { width } = useWindowSize()

  useEffect(() => {
    if (width && width > 1024) {
      setIsExpand(true)
    }
  }, [width])

  return (
    <div
      className={`fixed top-0 z-40 h-screen w-56 flex-shrink-0 bg-primary transition-[left] duration-500 ${isExpand ? 'left-0 lg:[&+div]:pl-56' : '-left-56 [&+div]:pl-0'}`}
    >
      <button
        type="button"
        className={`absolute top-4 flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border border-solid border-input bg-white shadow-md transition-[right] duration-500 ${isExpand ? 'right-[-1.25rem]' : 'right-[-3.5rem]'}`}
        onClick={toggleExpand}
      >
        <Menu className="shrink-0 text-primary" />
        <span className="mr-[-1px] text-[1px] text-white">toggle</span>
      </button>
      <div className="size-full overflow-y-auto px-5 py-8">
        <header>
          <div className="relative flex items-center text-white">
            <Image
              src="/img/logo/logo-bmb-white.png"
              width={26}
              height={42}
              alt="bmb"
              className="relative top-[-0.375rem]"
            />
            <span className="ml-4 text-2xl font-extrabold">bmb</span>
          </div>
        </header>
        <nav className="mt-5">
          <ul className="flex flex-col gap-2">
            {GnbItems.map((item) => {
              const { href, label, icon } = item
              const isActive = pathname === href

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`-mx-2 flex items-center rounded-md p-2 hover:text-white ${
                      isActive ? 'bg-[#0f9f71] text-white' : 'text-white/80'
                    }`}
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
