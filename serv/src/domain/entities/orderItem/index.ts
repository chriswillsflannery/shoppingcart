import { z } from "zod";

export const zOrderItem = z.object({
  orderId: z.number().int(),
  itemId: z.number().int(),
  quantity: z.number().int(),
});

export type OrderItem = z.infer<typeof zOrderItem>;