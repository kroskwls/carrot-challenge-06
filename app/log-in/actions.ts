"use server";

import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const schema = z.object({
  email: z.string().trim().email()
    .endsWith("@zod.com", "Only @zod.com emails are allowed"),
  password: z.string()
    .min(8, "Password should be at leat 10 characters long")
    .regex(new RegExp(/^(?=.*?[0-9]).{8,}$/), "Password should contain at least one number (0123456789)"),
});

export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = {
    email: formData.get("email"),
    password: formData.get("password")
  };

  const result = await schema.spa(data);
  if (!result.success) {
    return {
      success: result.success,
      errors: result.error.flatten()
    };
  }

  const user = await db.user.findUnique({
    where: { email: result.data.email },
    select: {
      id: true,
      password: true
    }
  });

  if (!user) {
    return {
      success: false,
      errors: {
        fieldErrors: {
          password: [],
          email: ["Could not find email."]
        }
      }
    };
  }

  const ok = await bcrypt.compare(result.data.password, user.password);
  if (!ok) {
    return {
      success: false,
      errors: {
        fieldErrors: {
          password: ["Wrong password."],
          email: []
        }
      }
    };
  }

  const session = await getSession();
  session.id = user.id;
  await session.save();

  redirect("/profile");
}
