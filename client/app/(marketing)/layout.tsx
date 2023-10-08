import Header from '@/components/ui/marketing/Header'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import React from 'react'


const MarketingLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <Header />
      <main className='flex-1'>{children}</main>
    </div>
  )
}

export default MarketingLayout