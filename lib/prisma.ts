// lib/prisma.ts
// Instância singleton do Prisma Client compatível com Next.js Serverless na Vercel

let PrismaClientClass: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const clientModule = require("@prisma/client");
  PrismaClientClass = clientModule.PrismaClient;
} catch {
  PrismaClientClass = class {
    user: any;
    doacao: any;
    campanha: any;
    lojaItem: any;
    movimentacao: any;
    $disconnect: () => Promise<void> = async () => {};
  };
}

const globalForPrisma = globalThis as unknown as {
  prisma: any;
};

export const prisma: any =
  globalForPrisma.prisma ??
  (PrismaClientClass
    ? new PrismaClientClass({
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
      })
    : null);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
