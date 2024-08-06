import { Gnb } from '@/components/modules/Gnb'

export interface GnbTemplateProps {
  children: React.ReactNode
}

const GnbTemplate = ({ children }: GnbTemplateProps) => {
  return (
    <div>
      <Gnb />
      <div className="size-full transition-[padding-left] duration-500">
        <main className="px-6 py-16">{children}</main>
      </div>
    </div>
  )
}

export { GnbTemplate }
