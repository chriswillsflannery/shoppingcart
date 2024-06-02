import { z } from 'zod';
import { zOrder } from '../../entities/order';

const createOrder = z.object({ body: zOrder });

export const orderInput = {
  createOrder
}

export namespace OrderInput {
  export type Create = z.infer<typeof createOrder>
}