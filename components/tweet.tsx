"use client";

import { ArrowUturnLeftIcon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import LikeButton from "./like-button";
import { getFormattedDate } from "@/lib/utils";
import { KeyboardEvent, useEffect, useOptimistic, useRef, useState } from "react";
import { getUserInfo, handleAddComment } from "@/app/tweet/[id]/actions";
import CommentList from "./comment-list";

export interface Comment {
  id: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
  tweetId: number;
  user: { username: string; email: string };
}

interface TweetProps {
  username: string;
  email: string;
  created_at: Date;
  text: string;
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
  comments: Comment[];
}

export default function Tweet({
  tweetId,
  username,
  email,
  created_at,
  text,
  isLiked,
  likeCount,
  comments,
}: TweetProps) {
  const [showReply, setShowReply] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const hide = () => setShowReply(false);
  const [user, setUser] = useState<{
    username: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    getUserInfo().then((user) => setUser(user));
  }, []);

  const [state, reduceFn] = useOptimistic(comments, (prev, payload: string) => [
    {
      id: 0,
      comment: payload,
      created_at: new Date(),
      updated_at: new Date(),
      tweetId,
      user: {
        username: user?.username ?? "unknown",
        email: user?.email ?? "unknown",
      },
    },
    ...prev,
  ]);

  const onClickAddReply = async () => {
    const comment = inputRef.current?.value ?? "";
    const user = await getUserInfo();

    reduceFn(comment);
    formRef.current?.reset();
    hide();

    await handleAddComment(tweetId, comment);
  };

  const onKeyDownPreventSubmitByEnter = (event: KeyboardEvent<HTMLFormElement>) => {
    const key = event.key;
    if (key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3 border p-5 mt-10">
        <UserCircleIcon className="size-14" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex gap-2 items-center">
            <div className="font-semibold">{username}</div>
            <div className="text-sm text-gray-500">@{email.split("@")[0]}</div>
            <div className="text-sm text-gray-500">·</div>
            <div className="text-sm text-gray-500">{getFormattedDate(created_at)}</div>
          </div>
          <div>{text}</div>
          <div className="flex justify-between">
            <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={tweetId} />
            <button
              className="flex gap-2 items-center hover:underline cursor-pointer"
              onClick={() => setShowReply((prev) => !prev)}
            >
              <ArrowUturnLeftIcon className="size-4" />
              Reply
            </button>
          </div>
        </div>
      </div>
      <div
        className={[
          "transition-all duration-500 origin-top",
          showReply ? "visible h-[200px] scale-y-100" : "invisible h-0 scale-y-0",
        ].join(" ")}
      >
        <form
          ref={formRef}
          className="border p-5 flex flex-col gap-3"
          onKeyDown={onKeyDownPreventSubmitByEnter}
        >
          <div className="flex justify-between">
            <h2>Reply to {username} :</h2>
            <button type="button" onClick={hide}>
              <XMarkIcon className="size-5" />
            </button>
          </div>
          <div className="flex items-center border border-gray-300 rounded-full px-5 outline-none focus-within:ring-2 focus-within:ring-gray-300 focus-within:ring-offset-2">
            <input
              ref={inputRef}
              className="p-3 outline-none w-full"
              type="text"
              placeholder="Leave a comment."
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-200 rounded-full px-5 py-3 font-bold hover:bg-gray-300 disabled:text-gray-400"
              onClick={onClickAddReply}
            >
              Apply
            </button>
          </div>
        </form>
      </div>
      <CommentList comments={state} />
    </div>
  );
}
