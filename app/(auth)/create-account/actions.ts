"use server";

import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: { username }
  });

  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email }
  });

  return !Boolean(user);
};

const checkBothPasswords = ({ password, confirmPassword }: { password: string, confirmPassword: string }) => (password === confirmPassword);

const schema = z.object({
  username: z.string().trim()
    .min(5, "Username should be at least 5 characters long")
    .refine(checkUniqueUsername, "There is an account already with that username"),
  email: z.string().trim().email()
    .endsWith("@zod.com", "Only @zod.com emails are allowed")
    .refine(checkUniqueEmail, "There is an account already with that email"),
  password: z.string()
    .min(8, "Password should be at leat 10 characters long")
    .regex(new RegExp(/^(?=.*?[0-9]).{8,}$/), "Password should contain at least one number (0123456789)"),
  confirmPassword: z.string(),
}).refine(checkBothPasswords, {
  message: "Both passwords should be the same",
  path: ["confirmPassword"]
});

export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword")
  };

  const result = await schema.spa(data);
  if (!result.success) {
    return {
      success: result.success,
      errors: result.error.flatten()
    };
  }

  const { username, email, password } = result.data;
  const hashedPassword = await bcrypt.hash(password, 12);
  await db.user.create({
    data: { username, email, password: hashedPassword }
  });

  redirect("/log-in");
}
