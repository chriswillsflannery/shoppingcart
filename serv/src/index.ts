import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from "@trpc/server/adapters/fastify";
import fastify, { FastifyRequest } from "fastify";
import { createContext } from "./context";
import { appRouter, type AppRouter } from "./routers/app";
import prismaPlugin from './prismaPlugin';
import cors from '@fastify/cors';

const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3006;
const server = fastify({
  maxParamLength: 5000,
});

server.addHook('preValidation', (request: FastifyRequest, _, done) => {
  // Log incoming request
  console.log('Incoming request preval:', request.body);
  done();
});

server.addHook('onRequest', (request: FastifyRequest, _, done) => {
  // Log incoming request
  console.log('Incoming onrequest:', request.body);
  done();
});

server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      console.error(`Error in tRPC handler on path ${path}: `, error);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
});
server.register(cors, {
  origin: ['http://localhost:5173']
})
server.register(prismaPlugin);

(async () => {
  try {
    await server.listen({ port: FASTIFY_PORT })
      .then(() => console.log(`🚀  Fastify server running on port http://localhost:${FASTIFY_PORT}`))
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();