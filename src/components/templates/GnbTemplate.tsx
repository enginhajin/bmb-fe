import { Gnb } from '@/components/organisms/Gnb'

export interface GnbTemplateProps {
  children: React.ReactNode
}

const GnbTemplate = ({ children }: GnbTemplateProps) => {
  return (
    <div>
      <Gnb />
      <div className="size-full transition-[padding-left] duration-500">
        <main className="mx-auto max-w-7xl px-6 py-[4.5rem]">{children}</main>
      </div>
    </div>
  )
}

export { GnbTemplate }
