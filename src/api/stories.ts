import { AllStoriesData } from "@/pages/api/stories";
import axios from "axios";

export const getAllStories = async (): Promise<AllStoriesData> => {
  const data = await axios.get("/api/stories");
  return data.data;
};
