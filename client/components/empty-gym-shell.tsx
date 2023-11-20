import React from 'react'
import { DashboardShell } from './dashboard-shell'
import { EmptyPlaceholder } from './empty-placeholder'

type Props = {}

const EmptyGymShell = (props: Props) => {
  return (
    <>
        <DashboardShell>
    
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No gyms created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any Gym yet. Add one right away.
            </EmptyPlaceholder.Description>
            TODO: add Gym Create button
            {/* <GymCreateButton variant="outline" /> */}
          </EmptyPlaceholder>
        </DashboardShell>
      </>
  )
}

export default EmptyGymShell