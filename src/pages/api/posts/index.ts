import { Post, PostLike, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { AttachImage } from "@/features/images/attach-image";
import findFollowingPosts from "@/features/posts/findFollowingPosts";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { createPostSchema } from "@/features/posts/createPost/createPost.schema";
import createPost from "@/features/posts/createPost/createPost";

export type PostWithAuthor = AttachImage<Post, "post"> & {
  _count: {
    liked_bys: number;
  };
  liked_bys: PostLike[];
  user: AttachImage<User, "user">;
};

export type AllPostsData = {
  posts: PostWithAuthor[];
};

export type CreatedPostData = {
  post: Post;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AllPostsData | CreatedPostData>
) {
  const currentSession = await getServerSession(req, res, authOptions);
  if (req.method == "GET") {
    const posts = await findFollowingPosts(currentSession?.user.id ?? "");
    res.status(200).json({ posts });
  } else if (req.method == "POST") {
    const data = createPostSchema.parse(req.body);
    const post = await createPost(data, currentSession?.user.id ?? "");
    res.status(201).json({ post });
  } else {
    // Method not allowed
    res.status(405);
  }
}
