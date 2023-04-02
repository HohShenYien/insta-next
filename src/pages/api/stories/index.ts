import { Story, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { AttachImage } from "@/features/images/attach-image";
import findManyStories from "@/features/stories/findManyStories";

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
  const stories = await findManyStories();
  res.status(200).json({ stories });
}
