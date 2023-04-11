import type { NextApiRequest, NextApiResponse } from "next";
import { AttachImage } from "@/features/images/attach-image";
import { Post, Prisma, User } from "@prisma/client";
import findSinglePost from "@/features/posts/findSinglePost";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

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
        // we don't need to pass where in payload type
        // since filtered or not should return the same type
        liked_bys: true;
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
  const session = await getServerSession(req, res, authOptions);

  try {
    const data = await findSinglePost(session?.user.id ?? "", post_id);
    res.status(200).json(data);
  } catch (exception) {
    res.status(404).end();
  }
}
