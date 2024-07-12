import db from "@/lib/db";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { notFound } from "next/navigation";

interface TweetDetailProps {
  params: { id: string };
}

const getTweet = async (id: number) => {
  const tweet = await db.tweet.findFirst({
    where: { id },
    select: {
      tweet: true,
      created_at: true,
      User: {
        select: {
          username: true,
          email: true
        }
      }
    }
  });

  return tweet;
}

export default async function TweetDetai({ params: { id } }: TweetDetailProps) {
  const tweet = await getTweet(Number(id));
  if (!tweet) {
    return notFound();
  }
  const { tweet: text, created_at, User: { username, email } } = tweet;
  return (
    <div className="flex gap-3 border p-5 mt-10">
      <UserCircleIcon className="size-14" />
      <div className="flex flex-col gap-2 w-[calc(100%-4.25rem)]">
        <div className="flex gap-2 items-center">
          <div className="font-semibold">{username}</div>
          <div className="text-sm text-gray-500">@{email.split("@")[0]}</div>
          <div className="text-sm text-gray-500">·</div>
          <div className="text-sm text-gray-500">{created_at.toLocaleDateString()}</div>
        </div>
        {text}
      </div>
    </div>
  );
}