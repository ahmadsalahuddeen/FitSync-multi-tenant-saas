import EmptyGymShell from '@/components/empty-gym-shell'
import { getCurrentUser } from '@/lib/session'
import { useGymStore } from '@/store/gym'
import React from 'react'

type Props = {}

const HomePage = async (props: Props) => {

  const gym = useGymStore.getState().gym;
  const user = await getCurrentUser()

  if(!gym ){
    return <EmptyGymShell/>
  }
  return (
    
    <div>

<h1>{`${user?.name}`}</h1>
    </div>
  )
}

export default HomePage