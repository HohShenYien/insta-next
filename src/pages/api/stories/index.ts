import { Story, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { AttachImage } from "@/features/images/attach-image";
import findFollowingStories from "@/features/stories/findFollowingStories";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { createStorySchema } from "@/features/stories/createStory/createStory.schema";
import createStory from "@/features/stories/createStory/createStory";

export type AllStoriesData = {
  stories: {
    user: AttachImage<User, "user">;
    stories: AttachImage<Story, "story">[];
  }[];
};

export type CreatedStoryData = {
  story: Story;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AllStoriesData | CreatedStoryData>
) {
  const currentSession = await getServerSession(req, res, authOptions);
  if (req.method == "GET") {
    const stories = await findFollowingStories(currentSession?.user.id ?? "");
    res.status(200).json({ stories });
  } else if (req.method == "POST") {
    const data = createStorySchema.parse(req.body);
    const story = await createStory(data, currentSession?.user.id ?? "");
    res.status(201).json({ story });
  } else {
    // Method not allowed
    res.status(405);
  }
}
