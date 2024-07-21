import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-gray-200 rounded-full px-5 py-3 font-bold hover:bg-gray-300 disabled:text-gray-400"
      disabled={pending}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
