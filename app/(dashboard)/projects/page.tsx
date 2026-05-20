import { Button } from "@/components/ui/button"
import ProjectList from "@/features/projects/components/project-list"
import { getRequiredSession } from "@/lib/session"
import Link from "next/link"

export default async function ProjectsPage() {
  const { user } = await getRequiredSession()
  return (
    <div>
      <Button asChild>
        <Link href={"/projects/create"}>Create</Link>
      </Button>
      <ProjectList userId={user.id} />
    </div>
  )
}
