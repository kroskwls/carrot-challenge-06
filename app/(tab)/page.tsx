import AddTweet from "@/components/add-tweet";
import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export const countPerPage = 4;
const getInitialTweets = async () => {
  const initialTweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      User: {
        select: {
          username: true,
          email: true
        }
      }
    },
    take: countPerPage,
    orderBy: {
      created_at: "desc"
    }
  });

  return initialTweets;
};

export type initialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
  const initialTweets = await getInitialTweets();

  return (
    <div className="flex flex-col gap-5 w-full">
      <AddTweet />
      <TweetList initialTweets={initialTweets} />
    </div>
  );
}
