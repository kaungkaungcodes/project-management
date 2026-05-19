import { z } from "zod"

export const signInSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, "Email or username is required")
    .min(5, "Email or username must be at least 5 characters.")
    .max(20, "Email or username must be less than 20 characters."),
  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters.")
    .max(20, "Password must be less than 20 characters."),
})

export type SignInInput = z.infer<typeof signInSchema>

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  email: z.email(),
  username: z
    .string()
    .min(1, "Username is required")
    .min(5, "Username must be at least 5 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(
      /^[a-z0-9_]+$/,
      "Username must contain only lowercase letters, numbers, and underscores."
    ),
  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters.")
    .max(20, "Password must be less than 20 characters."),
})

export type SignUpInput = z.infer<typeof signUpSchema>
