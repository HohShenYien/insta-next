import prisma from "@/utils/prisma";
import { SignUpUserParams } from "./signUpUser.schema";
import hashPassword from "@/features/password/hashPassword";

export default async function signUpUser(data: SignUpUserParams) {
  const user = await prisma.user.create({
    data: {
      ...data,
      // don't forget to hash the password instead of storing the plaintext!
      password: await hashPassword(data.password),
    },
  });
  // Let's give every user a default profile picture
  await prisma.image.create({
    data: {
      type: "user",
      associated_id: user.id,
      sequence: 0,
      url: `https://api.dicebear.com/6.x/adventurer/png?seed=${user.email}`,
    },
  });
  return user;
}
