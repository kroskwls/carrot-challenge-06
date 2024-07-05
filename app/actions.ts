"use server";

import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email()
    .endsWith("@zod.com", "Only @zod.com emails are allowed."),
  username: z.string().trim()
    .min(5, "Username should be at least 5 characters long."),
  password: z.string()
    .min(10, "Password should be at leat 10 characters long.")
    .regex(new RegExp(/^(?=.*?[0-9]).{10,}$/), "Password should contain at least one number (0123456789)."),
});

export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password")
  };

  const result = schema.safeParse(data);
  return result.success
    ? {
      success: result.success
    } : {
      success: result.success,
      errors: result.error.flatten()
    };
}
