import { z } from "zod";

export const registerUserSchema = z.object({
  firstName: z.string().min(2).max(32),
  lastName: z.string().min(2).max(32),
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});
