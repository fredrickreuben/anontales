import * as z from "zod"

export const talePatchSchema = z.object({
  content: z.any().optional(),
})
