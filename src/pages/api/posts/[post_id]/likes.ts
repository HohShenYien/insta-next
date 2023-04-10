import createPostLikes from "@/postLikes/createPostLikes";
import deletePostLikes from "@/postLikes/deletePostLikes";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { post_id } = req.query as { post_id: string };
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user.id ?? "";

  if (req.method == "POST") {
    await createPostLikes(userId, post_id);
    res.status(201).end();
  } else if (req.method == "DELETE") {
    await deletePostLikes(userId, post_id);
    res.status(204).end();
  } else {
    res.status(401);
  }
}
