"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function SignOutButton() {
  const { replace, refresh } = useRouter()
  const handleLogout = async () => {
    try {
      await authClient.signOut()
      replace("/sign-in")
      refresh()
    } catch {
      toast.error("Failed to logout")
    }
  }
  return (
    <Button variant={"destructive"} onClick={handleLogout}>
      Logout
    </Button>
  )
}
