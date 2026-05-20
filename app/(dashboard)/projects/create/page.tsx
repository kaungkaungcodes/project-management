import BackButton from "@/components/back-button"
import ProjectCreateForm from "@/features/projects/components/project-create-form"
import { getRequiredSession } from "@/lib/session"

export default async function ProjectCreatePage() {
  const { user } = await getRequiredSession()

  return (
    <div>
      <BackButton variant={"ghost"} />
      <ProjectCreateForm userId={user.id} />
    </div>
  )
}
