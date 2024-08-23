import { Gnb } from '@/components/organisms/Gnb'
import { ReactNode } from 'react'

export interface GnbTemplateProps {
  children: ReactNode
  title?: string
  headerContent?: ReactNode
}

const GnbTemplate = ({ children, title, headerContent }: GnbTemplateProps) => {
  return (
    <div>
      <Gnb />
      <div className="size-full transition-[padding-left] duration-500">
        <main className="mx-auto max-w-6xl px-6 py-[4.5rem]">
          <header className="md:flex md:items-center md:justify-between">
            <h1 className="mb-5 text-xl font-semibold md:text-2xl">{title}</h1>
            {headerContent}
          </header>
          {children}
        </main>
      </div>
    </div>
  )
}

export { GnbTemplate }
