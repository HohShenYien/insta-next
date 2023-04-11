import axios from "axios";

interface UserUsername {
  username: string;
}

export const followUser = async ({ username }: UserUsername): Promise<void> => {
  await axios.post(`/api/users/${username}/follows`);
};

export const unFollowUser = async ({
  username,
}: UserUsername): Promise<void> => {
  await axios.delete(`/api/users/${username}/follows`);
};
