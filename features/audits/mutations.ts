"use server"

import { prisma } from "@/lib/prisma"

export const createAuditLog = async (action: string, userId: string) => {
  return await prisma.auditLog.create({
    data: {
      action,
      userId,
    },
  })
}
