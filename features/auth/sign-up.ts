"use server"

import { auth } from "@/lib/auth"
import { signUpSchema } from "./schema"
import { redirect } from "next/navigation"

export const signUp = async (values: unknown) => {
  const result = await signUpSchema.safeParseAsync(values)

  if (!result.success) {
    return {
      success: false,
      error: result.error.flatten().fieldErrors,
    }
  }

  const { name, username, email, password } = result.data

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        username,
        email,
        password,
      },
    })
  } catch {
    return {
      success: false,
      message: "Email or username may already be in use",
    }
  }

  redirect("/dashboard")
}
