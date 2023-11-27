import { Card } from "@/components/ui/card"
import { CardSkeleton } from "@/components/card-skeleton"

import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
            <DashboardHeader heading={`Staff Management`}  text={'create and manage staff'} />

      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
