import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardShell } from '@/components/dashboard-shell'
import React from 'react'

type Props = {}

const StaffPage = (props: Props) => {
  return (
    <DashboardShell>
    <DashboardHeader heading={`Staff Management`}  />


</DashboardShell>
  )
}

export default StaffPage