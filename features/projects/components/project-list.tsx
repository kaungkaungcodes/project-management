import { getProjectsByUserId } from "../queries"

export default async function ProjectList({ userId }: { userId: string }) {
  const projects = await getProjectsByUserId(userId)

  return (
    <div>
      {projects.map((project) => {
        return <div key={project.id}>{project.name}</div>
      })}
    </div>
  )
}
