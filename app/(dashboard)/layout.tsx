import { AppSidebar } from "@/components/ui/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { getRequiredSession } from "@/lib/session"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await getRequiredSession()
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar username={user.username || "unknown"} email={user.email} />
      <SidebarInset>
        <header className="flex h-14 items-center border-b px-2">
          <SidebarTrigger />
        </header>
        <section className="p-4">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  )
}
