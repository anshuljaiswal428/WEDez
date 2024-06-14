import { z } from "zod"

export const validator = z.object({
  name: z.string().min(2, { message: 'Too short' }).max(50),
  email: z.string().email(),
  username: z.string().min(2, { message: 'Too short' }).max(50),
  password: z.string().min(2, { message: 'Password must be atleast 8 characters!' }),
})