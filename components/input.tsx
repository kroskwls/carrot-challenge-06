import { Envelop, Key, User } from "@/icons/svg-solid";
import { InputHTMLAttributes } from "react";

const icon: { [key: string]: JSX.Element } = {
  "email": <Envelop />,
  "password": <Key />,
  "username": <User />
};

interface InputProps {
  errors?: string[];
}

export default function Input({ name = '', errors, ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <div className={`flex items-center border border-gray-300 rounded-full px-5 outline-none focus-within:ring-2 focus-within:ring-gray-300 focus-within:ring-offset-2 ${errors ? "focus-within:ring-red-500 border-red-500" : ""}`}>
        <div>{icon[name]}</div>
        <input
          className="p-3 outline-none"
          name={name}
          autoComplete="off"
          {...rest}
        />
      </div>
      {errors?.map((error, index) => (
        <div key={index} className="text-red-500 text-sm mt-2">
          {error}
        </div>
      ))}
    </div>
  );
}
