import { SignUpUserParams } from "@/features/users/signUpUser/signUpUser.schema";
import { CreatedUserData } from "@/pages/api/users";
import { UserInfoData } from "@/pages/api/users/[username]";
import axios from "axios";

export const getUserInfo = async (username: string): Promise<UserInfoData> => {
  const data = await axios.get(`/api/users/${username}`);
  return data.data;
};

export const signUpUser = async (
  data: SignUpUserParams
): Promise<CreatedUserData> => {
  const user = await axios.post(`/api/users`, data);
  return user.data;
};
