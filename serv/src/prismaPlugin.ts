import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

export const prisma = new PrismaClient();

const prismaPlugin: FastifyPluginAsync = fp(async (server) => {
  await prisma.$connect();
  console.log("🚀 Database connected successfully");

  server.decorate('prisma', prisma);
  server.addHook('onClose', async (server) => {
    await server.prisma.$disconnect();
  })
});

export default prismaPlugin