"use server";

import db from "@/lib/db"
import { countPerPage } from "./page";

export const getTweetsByPage = async (page: number) => {
  const tweets = await db.tweet.findMany({
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
    skip: countPerPage * page,
    take: countPerPage,
    orderBy: {
      created_at: "desc"
    }
  });

  return tweets;
}