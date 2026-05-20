import { z } from "zod"

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Project name is required.")
    .min(3, "Project name must be at least 3 characters.")
    .max(50, "Project name must be less than 50 characters."),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>
