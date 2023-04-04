import { compare } from "bcrypt";

const comparePassword = async (
  plainTextPassword: string,
  hashedPassword: string
) => {
  return await compare(plainTextPassword, hashedPassword);
};

export default comparePassword;
