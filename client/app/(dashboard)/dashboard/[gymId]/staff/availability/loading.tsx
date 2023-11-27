import { Card } from "@/components/ui/card"
import { CardSkeleton } from "@/components/card-skeleton"

import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
            <DashboardHeader heading={`My Profile`} text="Manage personal account settings" />

      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
