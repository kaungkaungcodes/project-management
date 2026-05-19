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
import { SignInInput, signInSchema } from "@/features/auth/schema"
import { useTransition } from "react"
import { signIn } from "@/features/auth/sign-in"
import { toast } from "sonner"

export default function SignInPage() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  })

  function handleSignIn(values: unknown) {
    try {
      startTransition(async () => {
        const result = await signIn(values)
        if (!result.success) {
          toast.error(result.message || "Failed to sign in")
        }
      })
    } catch {
      toast.error("Failed to sign in")
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
              <Link href={"/sign-up"}>Sign Up</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSignIn)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="emailOrUsername">Email or Username</Label>
                <Input
                  id="emailOrUsername"
                  {...form.register("emailOrUsername")}
                  type="text"
                  disabled={isPending}
                />
                {form.formState.errors.emailOrUsername && (
                  <small className="text-destructive">
                    {form.formState.errors.emailOrUsername.message}
                  </small>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
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
                {isPending ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full">
            Sign In with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
