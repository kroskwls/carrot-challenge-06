"use client";

import { ChatBubbleBottomCenterTextIcon, HomeIcon, UserIcon } from "@heroicons/react/24/solid";
import { ArrowRightStartOnRectangleIcon, ChatBubbleBottomCenterTextIcon as OutlineChat, HomeIcon as OutlineHome, UserIcon as OutlineUser } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Tabs({ logout }: { logout: () => void }) {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white">
      <div className="flex justify-between items-center w-full max-w-screen-sm mx-auto px-10 py-5 border-t border-gray-300">
        <Link
          className="flex flex-col items-center justify-center"
          href="/"
        >
          {pathname === "/" ? (
            <HomeIcon className="size-7" />
          ) : (
            <OutlineHome className="size-7" />
          )}
          Home
        </Link>
        <Link
          className="flex flex-col items-center justify-center"
          href="/profile"
        >
          {pathname === "/profile" ? (
            <UserIcon className="size-7" />
          ) : (
            <OutlineUser className="size-7" />
          )}
          Profile
        </Link>
        <form action={logout}>
          <button className="flex flex-col items-center justify-center cursor-pointer">
            <ArrowRightStartOnRectangleIcon className="size-7" />
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}