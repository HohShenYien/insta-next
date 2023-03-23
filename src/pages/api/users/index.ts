import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { AttachImage } from "@/features/images/attach-image";
import findManyUsers from "@/features/users/findManyUsers";

export type AllUsersData = {
  users: AttachImage<User, "user">[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AllUsersData>
) {
  const users = await findManyUsers();
  res.status(200).json({ users });
}
