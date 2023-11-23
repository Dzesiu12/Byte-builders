"use server";

import { prisma } from "@/server/db";
import { type z } from "zod";
import bcrypt from "bcrypt";
import { type registerUserSchema } from "./schemas";

export const registerUser = async (
  data: z.infer<typeof registerUserSchema>
) => {
  const user = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: bcrypt.hashSync(data.password, 10),
    },
  });

  return {
    data: user.id,
  };
};
