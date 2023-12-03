import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardShell } from '@/components/dashboard-shell'
import { StaffCreateButton } from '@/components/staff-invite-button'
import React from 'react'

type Props = {}

const StaffPage = (props: Props) => {
  return (
    <DashboardShell>
    <DashboardHeader heading={`Staff Management`} >
    <StaffCreateButton />
    </DashboardHeader>
    <DataTable data={tasks} columns={columns} />

</DashboardShell>
  )
}

export default StaffPage