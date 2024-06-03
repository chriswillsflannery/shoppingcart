import { z } from "zod";
import { zCartItem } from "../cartItem";

export const zCart = z.object({
  id: z.number().int().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().optional(),
  items: z.array(zCartItem),
});

export type Cart = z.infer<typeof zCart>;