import { z } from "zod";

export const zItem = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  price: z.number().int(),
  imageUrl: z.string().url(),
});

export type Item = z.infer<typeof zItem>;