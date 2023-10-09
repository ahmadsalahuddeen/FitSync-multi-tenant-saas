import Header from '@/components/ui/marketing/Header'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import React from 'react'
import { SiteFooter } from '@/components/site-footer'


const MarketingLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <Header />
      <main className='flex-1'>{children}</main>
      <SiteFooter/>
    </div>
  )
}

export default MarketingLayout