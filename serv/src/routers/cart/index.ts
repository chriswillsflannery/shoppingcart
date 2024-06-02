import { z } from 'zod';
import { t } from '../../trpcInit';
import { cartController } from '../../controllers/cart';
import { zCart } from '../../domain/entities/cart';

export const cartRouter = t.router({
  getCart: t.procedure
    .input(z.number().int())
    .query(({ input: cartId }) => cartController.getCart(cartId)),
  updateCart: t.procedure
    .input(zCart)
    .mutation(({ input: cart }) => cartController.updateCart({ input: { body: cart } })),
})