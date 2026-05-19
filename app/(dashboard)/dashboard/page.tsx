import { getRequiredSession } from "@/lib/session"

export default async function DashboardPage() {
  const { user } = await getRequiredSession()
  return <div>{user.name}</div>
}
