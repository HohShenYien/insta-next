import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { AttachImage } from "@/features/images/attach-image";
import findManyUsers from "@/features/users/findManyUsers";
import signUpUser from "@/features/users/signUpUser/signUpUser";
import { signUpUserSchema } from "@/features/users/signUpUser/signUpUser.schema";

export type AllUsersData = {
  users: AttachImage<User, "user">[];
};

export type CreatedUserData = {
  user: User;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AllUsersData | CreatedUserData>
) {
  if (req.method == "GET") {
    const users = await findManyUsers();
    res.status(200).json({ users });
  } else if (req.method == "POST") {
    const body = signUpUserSchema.parse(req.body);
    res.status(201).json({ user: await signUpUser(body) });
  } else {
    // method not allowed
    res.status(405);
  }
}
