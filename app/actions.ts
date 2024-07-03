"use server";

export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const password = formData.get("password");
  return password === '12345'
    ? {
      success: true
    } : {
      sucess: false,
      errors: ["wrong password"]
    };
}