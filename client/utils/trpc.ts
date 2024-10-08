import type { AppRouter } from '../../serv/src/routers/app';
import { createTRPCReact } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>();