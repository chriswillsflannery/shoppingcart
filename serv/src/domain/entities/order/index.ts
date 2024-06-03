import { z } from "zod";
import { zOrderItem } from "../orderItem";

export const zOrder = z.object({
  id: z.number().int().optional(),
  createdAt: z.date().default(() => new Date()),
  items: z.array(zOrderItem),
});

export type Order = z.infer<typeof zOrder>;