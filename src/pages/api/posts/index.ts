import { Post, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { AttachImage } from "@/features/images/attach-image";
import findFollowingPosts from "@/features/posts/findFollowingPosts";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export type PostWithAuthor = AttachImage<Post, "post"> & {
  _count: {
    liked_bys: number;
  };
  user: AttachImage<User, "user">;
};

export type AllPostsData = {
  posts: PostWithAuthor[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AllPostsData>
) {
  const currentSession = await getServerSession(req, res, authOptions);
  const posts = await findFollowingPosts(currentSession?.user.id ?? "");
  res.status(200).json({ posts });
}
