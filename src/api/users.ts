import { UserInfoData } from "@/pages/api/users/[username]";
import axios from "axios";

export const getUserInfo = async (username: string): Promise<UserInfoData> => {
  const data = await axios.get(`/api/users/${username}`);
  return data.data;
};
