import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import findUserInfo from "@/features/users/findUserInfo";
import createUserFollower from "@/features/userFollowers/createUserFollower";
import deleteUserFollower from "@/features/userFollowers/deleteUserFollower";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query as { username: string };
  const session = await getServerSession(req, res, authOptions);
  const followerId = session?.user.id ?? "";
  const user = await findUserInfo(username, followerId);

  if (req.method == "POST") {
    await createUserFollower(user.id, followerId);
    res.status(201).end();
  } else if (req.method == "DELETE") {
    await deleteUserFollower(user.id, followerId);
    res.status(204).end();
  } else {
    res.status(401);
  }
}
