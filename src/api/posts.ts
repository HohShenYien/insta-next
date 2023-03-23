import { AllPostsData } from "@/pages/api/posts";
import axios from "axios";

export const getAllPosts = async (): Promise<AllPostsData> => {
  const data = await axios.get("/api/posts");
  return data.data;
};
