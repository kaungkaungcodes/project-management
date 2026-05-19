import { redirect } from "next/navigation"
import { auth } from "./auth"
import { headers } from "next/headers"

export const getRequiredSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/sign-in")
  }

  return session
}
