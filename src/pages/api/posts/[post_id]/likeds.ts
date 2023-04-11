import type { NextApiRequest, NextApiResponse } from "next";
import findPostLikedUsers from "@/features/posts/findPostLikedUsers";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { UserWithFollowersAndImage } from "@/utils/types";

export type PostLikedUsersData = {
  users: UserWithFollowersAndImage[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostLikedUsersData>
) {
  const { post_id } = req.query as { post_id: string };
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user.id ?? "";

  try {
    const users = await findPostLikedUsers(post_id, userId);
    res.status(200).json({ users });
  } catch (exception) {
    res.status(404).end();
  }
}
