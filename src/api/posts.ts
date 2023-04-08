import { CreatePostParams } from "@/features/posts/createPost/createPost.schema";
import { AllPostsData, CreatedPostData } from "@/pages/api/posts";
import { PostData } from "@/pages/api/posts/[post_id]";
import { PostLikedUsersData } from "@/pages/api/posts/[post_id]/likeds";
import { UserPostData } from "@/pages/api/users/[username]/posts";
import axios from "axios";

export const getAllPosts = async (): Promise<AllPostsData> => {
  const data = await axios.get("/api/posts");
  return data.data;
};

export const getPostLikeds = async (
  postId: string
): Promise<PostLikedUsersData> => {
  const data = await axios.get(`/api/posts/${postId}/likeds`);
  return data.data;
};

export const getUserPosts = async (username: string): Promise<UserPostData> => {
  const data = await axios.get(`/api/users/${username}/posts`);
  return data.data;
};

export const getSinglePost = async (postId: string): Promise<PostData> => {
  const data = await axios.get(`/api/posts/${postId}`);
  return data.data;
};

export const createPost = async (
  data: CreatePostParams
): Promise<CreatedPostData> => {
  const post = await axios.post("/api/posts", data);
  return post.data;
};
