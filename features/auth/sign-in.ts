"use server"

import { auth } from "@/lib/auth"
import { signInSchema } from "./schema"
import { redirect } from "next/navigation"

export const signIn = async (values: unknown) => {
  const result = await signInSchema.safeParseAsync(values)

  if (!result.success) {
    return {
      success: false,
      error: result.error.flatten().fieldErrors,
    }
  }

  const { emailOrUsername, password } = result.data
  const isEmail = emailOrUsername.includes("@")

  try {
    if (isEmail) {
      await auth.api.signInEmail({
        body: {
          email: emailOrUsername,
          password,
        },
      })
    } else {
      await auth.api.signInUsername({
        body: {
          username: emailOrUsername,
          password,
        },
      })
    }
  } catch {
    return {
      success: false,
      message: "Invalid login",
    }
  }

  redirect("/dashboard")
}
