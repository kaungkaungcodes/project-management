"use client"

import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { CreateProjectInput, createProjectSchema } from "../schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createProjectAction } from "../actions"
import { toast } from "sonner"

export default function ProjectCreateForm() {
  const [isPending, startTransition] = useTransition()
  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
    },
  })

  const handleCreate = (values: unknown) => {
    try {
      startTransition(async () => {
        const result = await createProjectAction(values)
        if (!result.success) {
          toast.error(result.message || "")
        }
      })
    } catch {
      toast.error("Failed to create project.")
    }
  }
  return (
    <Card>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              type="text"
              id="name"
              {...form.register("name")}
              disabled={isPending}
            />
            {form.formState.errors.name && (
              <small className="text-destructive">
                {form.formState.errors.name.message}
              </small>
            )}
          </div>
          <Button type="submit" disabled={isPending}>
            Create
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
