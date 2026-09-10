// backend/src/utils/prismaClient.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // allow global prisma in dev to prevent multiple instances during hot reload
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;