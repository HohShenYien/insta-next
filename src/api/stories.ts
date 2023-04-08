import { CreateStoryParams } from "@/features/stories/createStory/createStory.schema";
import { AllStoriesData, CreatedStoryData } from "@/pages/api/stories";
import axios from "axios";

export const getAllStories = async (): Promise<AllStoriesData> => {
  const data = await axios.get("/api/stories");
  return data.data;
};

export const createStory = async (
  data: CreateStoryParams
): Promise<CreatedStoryData> => {
  const post = await axios.post("/api/stories", data);
  return post.data;
};
