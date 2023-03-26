import { AllPostsData } from "@/pages/api/posts";
import { PostLikedUsersData } from "@/pages/api/posts/[post_id]/likeds";
import axios from "axios";

export const getAllPosts = async (): Promise<AllPostsData> => {
  const data = await axios.get("/api/posts");
  return data.data;
};

export const getPostLikeds = async (
  postId: number
): Promise<PostLikedUsersData> => {
  const data = await axios.get(`/api/posts/${postId}/likeds`);
  return data.data;
};
