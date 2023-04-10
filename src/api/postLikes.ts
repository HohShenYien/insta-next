import axios from "axios";

interface PostId {
  postId: string;
}

export const likePost = async ({ postId }: PostId): Promise<void> => {
  await axios.post(`/api/posts/${postId}/likes`);
};

export const unlikePost = async ({ postId }: PostId): Promise<void> => {
  await axios.delete(`/api/posts/${postId}/likes`);
};
