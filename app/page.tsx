"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import { CheckCircle } from "@/icons/svg-outline";

export default function Home() {
  const [state, dispatch] = useFormState(handleForm, null);
  return (
    <main className="py-5 w-[500px] mx-auto">
      <div className="text-5xl text-center my-14">🔥</div>
      <form className="flex flex-col gap-4" action={dispatch}>
        <Input type="email" name="email" placeholder="Email" required errors={state?.errors?.fieldErrors.email} />
        <Input type="text" name="username" placeholder="Username" required errors={state?.errors?.fieldErrors.username} />
        <Input type="password" name="password" placeholder="Password" required errors={state?.errors?.fieldErrors.password} />
        <Button text="Log in" />
      </form>
      {state?.success ? (
        <div className="flex gap-4 bg-green-500 mt-4 p-5 rounded-xl font-bold items-center">
          <CheckCircle />
          <div>Welcome back!</div>
        </div>
      ) : null}
    </main>
  );
}
