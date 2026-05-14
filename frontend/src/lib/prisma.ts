/**
 * Prisma singleton client.
 *
 * Prevents multiple Prisma instances
 * during hot reload in development.
 */

import { PrismaClient } from "@prisma/client";

/**
 * Global Prisma reference.
 */
const globalForPrisma =
  globalThis as unknown as {
    prisma:
      | PrismaClient
      | undefined;
  };

/**
 * Create Prisma instance.
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient();

/**
 * Prevent multiple clients during dev.
 */
if (
  process.env.NODE_ENV !==
  "production"
) {
  globalForPrisma.prisma =
    prisma;
}