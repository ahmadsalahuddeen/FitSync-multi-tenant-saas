'use client'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useQuery } from 'react-query'

type Props = {
  
}

const StaffInvite = (props: Props) => {
  const searchParams = useSearchParams()
const inviteCode = searchParams.get('inviteCode')

const {data: session} = useSession()

const {
  data
} = useQuery({
  queryKey: ['gym']
})
  
  return (
    <div>StaffInvite</div>
  )
}

export default StaffInvite