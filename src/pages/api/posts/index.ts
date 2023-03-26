import { Post, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { AttachImage } from "@/features/images/attach-image";
import findManyPosts from "@/features/posts/findManyPosts";

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
  const posts = await findManyPosts();
  res.status(200).json({ posts });
}
