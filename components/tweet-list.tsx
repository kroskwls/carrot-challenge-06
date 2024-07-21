"use client";

import { getTweetsByPage } from "@/app/(tab)/actions";
import { initialTweets } from "@/app/(tab)/page";
import { getFormattedDate } from "@/lib/utils";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

interface TweetProps {
  initialTweets: initialTweets;
}

export default function TweetList({ initialTweets }: TweetProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setTweets(initialTweets);
    setPage(0);
  }, [initialTweets]);

  const onClickNextPage = async () => {
    const newTweets = await getTweetsByPage(page + 1);
    setPage((prev) => prev + 1);
    if (newTweets.length !== 0) {
      setTweets(newTweets);
    }
  };

  const onClickPrevPage = async () => {
    if (page === 0) return;

    const newTweets = await getTweetsByPage(page - 1);
    setPage((prev) => prev - 1);
    setTweets(newTweets);
  };

  return (
    <div className="flex flex-col gap-5 w-full py-5">
      {tweets.map(({ id, tweet, created_at, User: { username, email } }) => (
        <Link key={id} className="flex gap-3 border-b p-5 hover:bg-gray-100" href={`/tweet/${id}`}>
          <UserCircleIcon className="size-14" />
          <div className="flex flex-col gap-2 w-[calc(100%-4.25rem)]">
            <div className="flex gap-2 items-center">
              <div className="font-semibold">{username}</div>
              <div className="text-sm text-gray-500">@{email.split("@")[0]}</div>
              <div className="text-sm text-gray-500">·</div>
              <div className="text-sm text-gray-500">{getFormattedDate(created_at)}</div>
            </div>
            {tweet}
          </div>
        </Link>
      ))}
      <div className="w-full flex gap-3 justify-center items-center">
        <button className="active:scale-95 text-2xl font-bold" onClick={onClickPrevPage}>
          ←
        </button>
        <span>{page + 1}</span>
        <button className="active:scale-95 text-2xl font-bold" onClick={onClickNextPage}>
          →
        </button>
      </div>
    </div>
  );
}
