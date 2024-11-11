import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(3),
  isActive: z.number().nullable(),
  description: z.string().nullable(),
});
