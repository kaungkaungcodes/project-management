"use server"

import { revalidatePath } from "next/cache"
import { createProject } from "./mutations"
import { createProjectSchema } from "./schema"
import { revalidateTag } from "next/cache"
import { getRequiredSession } from "@/lib/session"
import { createAuditLog } from "../audits/mutations"
import { redirect } from "next/navigation"

export const createProjectAction = async (values: unknown) => {
  const { user } = await getRequiredSession()
  const result = createProjectSchema.safeParse(values)

  if (!result.success) {
    return {
      success: false,
      message: result.error.message,
    }
  }

  const { name } = result.data

  try {
    await createProject(user.id, name)
  } catch {
    return {
      success: false,
      message: "Failed to create project.",
    }
  }

  const action = `Created project "${name}"`
  await createAuditLog(action, user.id)

  revalidatePath("/projects")
  revalidateTag(`${user.id}-projects`, "max")

  redirect("/projects")
}
