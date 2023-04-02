import type { NextApiRequest, NextApiResponse } from "next";
import { AttachImage } from "@/features/images/attach-image";
import { Prisma, User } from "@prisma/client";
import findUserInfo from "@/features/users/findUserInfo";

export type UserInfoData = {
  user: AttachImage<
    Prisma.UserGetPayload<{
      include: {
        _count: {
          select: {
            followers: true;
            followings: true;
            posts: true;
          };
        };
      };
    }>,
    "user"
  >;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserInfoData>
) {
  const { username } = req.query as { username: string };

  try {
    const user = await findUserInfo(username);
    res.status(200).json({ user });
  } catch (exception) {
    res.status(404).end();
  }
}
