'use client'

import Image from 'next/image'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useEffect } from 'react'

export interface SignTemplateProps {
  children: React.ReactNode
  title: string
  footer: React.ReactNode
}

const SignTemplate = ({ children, title, footer }: SignTemplateProps) => {
  useEffect(() => {
    document.body.classList.add('bg-primary')
    return () => {
      document.body.classList.remove('bg-primary')
    }
  }, [])

  return (
    <div className="flex size-full min-h-svh flex-wrap items-center justify-center bg-primary p-5">
      <Card className="w-full max-w-sm shadow-2xl">
        <CardHeader className="items-center space-y-5">
          <div className="w-8">
            <Image
              src="/img/logo/logo-bmb-primary.png"
              width={120}
              height={195}
              alt="bmb logo"
            />
          </div>
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="justify-center">{footer}</CardFooter>
      </Card>
    </div>
  )
}

export { SignTemplate }
