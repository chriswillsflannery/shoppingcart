import { t } from '../../trpcInit';
import { itemsRouter } from '../items';
import { cartRouter } from '../cart'; 
import { orderRouter } from '../order';

export const appRouter = t.router({
  items: itemsRouter,
  cart: cartRouter,
  order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

