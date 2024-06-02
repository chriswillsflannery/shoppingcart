import { z } from 'zod';
import { zCart } from '../../entities/cart';

const updateCart = z.object({ body: zCart });

export const cartInput = {
  updateCart,
}

export namespace cartInput {
  export type Update = z.infer<typeof updateCart>
}