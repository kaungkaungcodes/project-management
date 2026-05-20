"use client"

import { FolderKanban, LayoutDashboard } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

type AppSidebarProps = {
  username: string
  email: string
}

export function AppSidebar({ username, email }: AppSidebarProps) {
  const pathname = usePathname()

  const navs = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Projects",
      href: "/projects",
      icon: FolderKanban,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <span className="text-lg font-semibold">2Gether</span>
      </SidebarHeader>
      <SidebarContent className="p-2">
        {navs.map((nav) => {
          const Icon = nav.icon
          const isActive = pathname === nav.href
          return (
            <Link
              key={nav.href}
              href={nav.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {nav.title}
            </Link>
          )
        })}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="rounded-lg">
              {username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{username}</span>
            <span className="truncate text-xs">{email}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
