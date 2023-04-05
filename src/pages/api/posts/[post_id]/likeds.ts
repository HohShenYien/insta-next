import type { NextApiRequest, NextApiResponse } from "next";
import { AttachImage } from "@/features/images/attach-image";
import { User } from "@prisma/client";
import findPostLikedUsers from "@/features/posts/findPostLikedUsers";

export type PostLikedUsersData = {
  users: AttachImage<User, "user">[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostLikedUsersData>
) {
  const { post_id } = req.query as { post_id: string };

  try {
    const users = await findPostLikedUsers(post_id);
    res.status(200).json({ users });
  } catch (exception) {
    res.status(404).end();
  }
}
