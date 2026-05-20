"use server"

import { prisma } from "@/lib/prisma"

export const getAuditLogs = async (limit: 10) => {
  return await prisma.auditLog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  })
}

export const getAuditLogsByUserId = async (userId: string, limit = 5) => {
  return await prisma.auditLog.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  })
}
