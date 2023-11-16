import { loginIsRequiredServer } from '@/lib/session'
import React from 'react'

type Props = {}

const CustomersPage = async (props: Props) => {
  await loginIsRequiredServer()
  return (
    <div>CustomersPage</div>
  )
}

export default CustomersPage