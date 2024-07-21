"use client";

import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { useOptimistic } from "react";
import { dislikeTweet, likeTweet } from "@/app/tweet/[id]/actions";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({ isLiked, likeCount, tweetId }: LikeButtonProps) {
  const [state, reduceFn] = useOptimistic({ isLiked, likeCount }, (prev, payload) => ({
    isLiked: !prev.isLiked,
    likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
  }));
  const onClickLikeButton = async () => {
    reduceFn(null);
    if (isLiked) {
      return await dislikeTweet(tweetId);
    } else {
      return await likeTweet(tweetId);
    }
  };

  return (
    <button
      className={[
        "flex gap-2 items-center text-sm border px-3 py-2 rounded-full hover:bg-gray-100 cursor-pointer",
        state.isLiked ? "text-red-500" : "",
      ].join(" ")}
      onClick={onClickLikeButton}
    >
      {state.isLiked ? (
        <>
          <HeartIcon className="size-5" />
          <span>({state.likeCount})</span>
        </>
      ) : (
        <>
          <OutlineHeartIcon className="size-5" />
          <span>({state.likeCount})</span>
        </>
      )}
    </button>
  );
}
