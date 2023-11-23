import { z } from "zod";

export const productDetailsFormSchema = z.object({
  name: z.string().min(1).max(255),
  categoryId: z.string().min(1),
  description: z.string().min(1).max(2000),
  price: z.coerce.number().int().min(100).max(100000000),
  conditionId: z.string().min(1),
  negotiable: z.boolean(),
  params: z.record(z.string(), z.string()),
});

export const contactDataFormSchema = z.object({
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  email: z.string().email(),
  phoneNumber: z.string().min(1).max(255),
});

export const createAdFormSchema = productDetailsFormSchema.and(
  contactDataFormSchema
);
