import { notFound } from "next/navigation";
import { getCachedLikeStatus, getTweet, getTweetComments } from "./actions";
import Tweet from "@/components/tweet";

interface TweetDetailProps {
  params: { id: string };
}

export default async function TweetDetai({ params: { id } }: TweetDetailProps) {
  const tweetId = Number(id);
  if (isNaN(tweetId)) {
    return notFound();
  }

  const tweet = await getTweet(tweetId);
  if (!tweet) {
    return notFound();
  }
  const comments = await getTweetComments(tweetId);

  const {
    tweet: text,
    created_at,
    User: { username, email },
  } = tweet;
  const { isLiked, likeCount } = await getCachedLikeStatus(tweetId);

  return (
    <div className="flex flex-col gap-5">
      <Tweet {...{ tweetId, username, email, created_at, isLiked, likeCount, text, comments }} />
    </div>
  );
}
