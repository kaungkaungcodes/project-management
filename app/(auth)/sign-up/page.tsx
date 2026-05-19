"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { SignUpInput, signUpSchema } from "@/features/auth/schema"
import { useTransition } from "react"
import { toast } from "sonner"
import { signUp } from "@/features/auth/sign-up"

export default function SignUpPage() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  function handleSignUp(values: unknown) {
    try {
      startTransition(async () => {
        const result = await signUp(values)
        if (!result.success) {
          toast.error(result.message || "Failed to sign up")
        }
      })
    } catch {
      toast.error("Failed to sign up")
    }
  }
  return (
    <div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign In to your account</CardTitle>
          <CardDescription>
            Enter your email or username below to sign in to your account
          </CardDescription>
          <CardAction>
            <Button variant="link" asChild>
              <Link href={"/sign-in"}>Sign In</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSignUp)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  type="text"
                  disabled={isPending}
                />
                {form.formState.errors.name && (
                  <small className="text-destructive">
                    {form.formState.errors.name.message}
                  </small>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  {...form.register("username")}
                  type="text"
                  disabled={isPending}
                />
                {form.formState.errors.username && (
                  <small className="text-destructive">
                    {form.formState.errors.username.message}
                  </small>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  {...form.register("email")}
                  type="email"
                  disabled={isPending}
                />
                {form.formState.errors.email && (
                  <small className="text-destructive">
                    {form.formState.errors.email.message}
                  </small>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  {...form.register("password")}
                  type="password"
                  disabled={isPending}
                />
                {form.formState.errors.password && (
                  <small className="text-destructive">
                    {form.formState.errors.password.message}
                  </small>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Signing up..." : "Sign Up"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full">
            Sign Up with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
