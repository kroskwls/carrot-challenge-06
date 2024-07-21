"use server";

import db from "@/lib/db";
import { z } from "zod";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

const countPerPage = 4;
export const getTweetsByPage = async (page: number) => {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      User: {
        select: {
          username: true,
          email: true,
        },
      },
    },
    skip: countPerPage * page,
    take: countPerPage,
    orderBy: {
      created_at: "desc",
    },
  });

  return tweets;
};

const tweetSchema = z.string().min(1).max(200);
export const handleAddTweet = async (_: any, formData: FormData) => {
  const tweet = formData.get("tweet");

  const result = tweetSchema.safeParse(tweet);
  if (!result.success) {
    return result.error.flatten();
  }

  const session = await getSession();
  if (!session.id) {
    return notFound();
  }

  const newTweet = await db.tweet.create({
    data: {
      tweet: result.data,
      User: {
        connect: {
          id: session.id,
        },
      },
    },
  });

  revalidatePath("/");
};
