import { Story, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { AttachImage } from "@/features/images/attach-image";
import findFollowingStories from "@/features/stories/findFollowingStories";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export type AllStoriesData = {
  stories: {
    user: AttachImage<User, "user">;
    stories: AttachImage<Story, "story">[];
  }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AllStoriesData>
) {
  const currentSession = await getServerSession(req, res, authOptions);
  const stories = await findFollowingStories(currentSession?.user.id ?? "");
  res.status(200).json({ stories });
}
