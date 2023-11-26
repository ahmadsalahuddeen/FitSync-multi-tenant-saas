'use client'
import EmptyGymShell from '@/components/empty-gym-shell'
import { getCurrentUser } from '@/lib/session'
import { useGymStore } from '@/store/gym'
import React from 'react'

type Props = {}

const HomePage =  (props: Props) => {

  const {gym} = useGymStore()


  if(gym === null ){
    console.log(gym)
    return <EmptyGymShell/>
  }
  return (
    
    <div>

<h1>{`${gym}`}</h1>
    </div>
  )
}

export default HomePage