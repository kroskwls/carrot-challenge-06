"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import Link from "next/link";

export default function LogIn() {
  const [state, dispatch] = useFormState(handleForm, null);
  return (
    <div className="py-5 mx-auto flex flex-col gap-4">
      <div className="text-5xl text-center my-10">🔥</div>
      <form className="flex flex-col gap-4" action={dispatch}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          errors={state?.errors?.fieldErrors.email}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          errors={state?.errors?.fieldErrors.password}
          required
        />
        <Button text="Log in" />
      </form>
      <div className="mx-auto">
        <span>Would you like to join us?</span>
        <Link className="ml-2 font-bold hover:underline" href="/create-account">Join</Link>
      </div>
    </div>
  );
}
