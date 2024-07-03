"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";

export default function Home() {
  const [state, dispatch] = useFormState(handleForm, null);
  return (
    <main className="py-5 w-[400px] mx-auto">
      <div className="text-5xl text-center my-14">🔥</div>
      <form className="flex flex-col gap-4" action={dispatch}>
        <Input type="email" name="email" placeholder="Email" required />
        <Input type="text" name="username" placeholder="Username" required />
        <Input type="password" name="password" placeholder="Password" required errors={state?.errors} />
        <Button text="Log in" />
      </form>
      {state?.success ? (
        <div className="flex gap-4 bg-green-500 mt-4 p-5 rounded-xl font-bold items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <div>Welcome back!</div>
        </div>
      ) : null}
    </main>
  );
}
