import { z } from "zod";
import { zCartItem } from "../cartItem";

export const zCart = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  items: z.array(zCartItem),
});

export type Cart = z.infer<typeof zCart>;