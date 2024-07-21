"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";
import { z } from "zod";

export const dislikeTweet = async (tweetId: number) => {
  const session = await getSession();
  if (!session.id) {
    return notFound();
  }

  try {
    const userId = session.id;
    await db.like.delete({
      where: {
        id: { userId, tweetId },
      },
    });
    revalidateTag(`tweet-like-${tweetId}`);
  } catch {}
};

export const likeTweet = async (tweetId: number) => {
  const session = await getSession();
  if (!session.id) {
    return notFound();
  }

  try {
    const userId = session.id;
    await db.like.create({
      data: { userId, tweetId },
    });
    revalidateTag(`tweet-like-${tweetId}`);
  } catch {}
};

export const getTweet = async (tweetId: number) => {
  const tweet = await db.tweet.findFirst({
    where: { id: tweetId },
    select: {
      tweet: true,
      created_at: true,
      User: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  });

  return tweet;
};

const getLikeStatus = async (tweetId: number, userId: number) => {
  const isLiked = await db.like.findUnique({
    where: {
      id: { userId, tweetId },
    },
    select: { created_at: true },
  });

  const likeCount = await db.like.count({
    where: { tweetId },
  });

  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
};

export async function getCachedLikeStatus(tweetId: number) {
  const session = await getSession();
  if (!session.id) {
    return notFound();
  }

  const userId = session.id;
  const cachedLikeState = nextCache(getLikeStatus, ["product-tweet-like"], {
    tags: [`tweet-like-${tweetId}`],
  });

  return cachedLikeState(tweetId, userId);
}

export const getTweetComments = async (tweetId: number) => {
  const comments = await db.comment.findMany({
    where: { tweetId },
    include: {
      user: {
        select: {
          username: true,
          email: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return comments;
};

export const handleAddComment = async (tweetId: number, comment: string) => {
  const session = await getSession();
  if (!session.id) {
    return notFound();
  }

  const newComment = await db.comment.create({
    data: {
      comment: comment,
      user: {
        connect: {
          id: session.id,
        },
      },
      tweet: {
        connect: {
          id: tweetId,
        },
      },
    },
  });

  revalidatePath(`tweet-detail-${tweetId}`);
};

export const getUserInfo = async () => {
  const session = await getSession();
  if (!session.id) {
    return notFound();
  }

  const user = await db.user.findUnique({
    where: { id: session.id },
    select: {
      username: true,
      email: true,
    },
  });

  return user;
};
