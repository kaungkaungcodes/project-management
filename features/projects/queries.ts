"use server"

import { prisma } from "@/lib/prisma"
import { unstable_cache } from "next/cache"

export const getProjectsByUserId = async (userId: string, limit = 10) => {
  return unstable_cache(
    async () => {
      return prisma.project.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit,
      })
    },
    ["projects", userId],
    {
      tags: [`${userId}-projects`],
      revalidate: 3600,
    }
  )()
}

export type ProjectListItem = Awaited<
  ReturnType<typeof getProjectsByUserId>
>[number]
