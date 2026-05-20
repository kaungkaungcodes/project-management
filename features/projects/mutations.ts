"use server"

import { prisma } from "@/lib/prisma"

export const createProject = async (userId: string, projectName: string) => {
  return await prisma.project.create({
    data: {
      userId,
      name: projectName,
    },
  })
}

export const updateProject = async (
  projectId: string,
  userId: string,
  projectName: string
) => {
  return await prisma.project.create({
    data: {
      userId,
      name: projectName,
    },
  })
}
