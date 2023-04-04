import type { NextApiRequest, NextApiResponse } from "next";
import { AttachImage } from "@/features/images/attach-image";
import { Post, Prisma, User } from "@prisma/client";
import findSinglePost from "@/features/posts/findSinglePost";

export type PostData = {
  author: AttachImage<User, "user">;
  post: AttachImage<
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
  >;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostData>
) {
  const { post_id } = req.query as { post_id: string };

  try {
    const data = await findSinglePost(post_id);
    res.status(200).json(data);
  } catch (exception) {
    res.status(404).end();
  }
}
