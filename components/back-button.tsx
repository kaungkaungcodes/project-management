"use client"

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { ComponentProps } from "react"

type BackButtonProps = ComponentProps<typeof Button>

export default function BackButton(props: BackButtonProps) {
  const router = useRouter()
  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    }
  }
  return (
    <Button {...props} onClick={handleBack}>
      Back
    </Button>
  )
}
