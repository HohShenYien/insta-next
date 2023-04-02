import type { NextApiRequest, NextApiResponse } from "next";
import { AttachImage } from "@/features/images/attach-image";
import { Prisma, User } from "@prisma/client";
import findUserPosts from "@/features/posts/findUserPosts";

export type UserPostData = {
  posts: AttachImage<
    Prisma.PostGetPayload<{
      include: {
        _count: {
          select: {
            liked_bys: true;
          };
        };
      };
    }>,
    "post"
  >[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserPostData>
) {
  const { username } = req.query as { username: string };

  try {
    const posts = await findUserPosts(username);
    res.status(200).json({ posts });
  } catch (exception) {
    res.status(404).end();
  }
}
