import { z } from "zod";

export const zCartItem = z.object({
  cartId: z.number().int(),
  itemId: z.number().int(),
  quantity: z.number().int(),
});

export type CartItem = z.infer<typeof zCartItem>;