import { getCurrentUser } from '@/lib/session'
import React from 'react'

type Props = {}

const HomePage = async (props: Props) => {

  const user = await getCurrentUser()
  return (
    
    <div>

<h1>{`${user?.name}`}</h1>
    </div>
  )
}

export default HomePage