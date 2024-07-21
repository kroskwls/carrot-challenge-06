"use client";

import { UserCircleIcon } from "@heroicons/react/24/solid";
import Button from "./button";
import { useFormState } from "react-dom";
import { handleAddTweet } from "@/app/(tab)/actions";
import Input from "./input";
import { useRef } from "react";

export default function AddTweet() {
  const ref = useRef<HTMLFormElement>(null);
  const [state, dispatch] = useFormState(async (_: any, formData: FormData) => {
    const result = await handleAddTweet(_, formData);
    ref.current?.reset();

    return result;
  }, null);

  return (
    <div className="flex gap-3 border-b p-5">
      <UserCircleIcon className="size-14" />
      <form ref={ref} className="flex flex-col gap-2 w-[calc(100%-4.25rem)]" action={dispatch}>
        <div className="flex flex-col gap-2 items-end">
          <Input
            className="w-full"
            name="tweet"
            placeholder="What is happening?!"
            errors={state?.formErrors}
          />
          <Button text="Post" />
        </div>
      </form>
    </div>
  );
}
