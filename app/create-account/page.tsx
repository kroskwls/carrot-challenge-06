"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(handleForm, null);
  return (
    <div className="py-5 mx-auto flex flex-col gap-4">
      <div className="text-5xl text-center my-10">🎉</div>
      <form className="flex flex-col gap-4" action={dispatch}>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          errors={state?.errors?.fieldErrors.username}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          errors={state?.errors?.fieldErrors.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          errors={state?.errors?.fieldErrors.password}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="ConfirmPassword"
          errors={state?.errors?.fieldErrors.confirmPassword}
        />
        <Button text="Create Account" />
      </form>
    </div>
  );
}