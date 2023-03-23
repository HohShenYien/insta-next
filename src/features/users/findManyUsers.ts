import attachImage from "../images/attach-image";
import prisma from "@/utils/prisma";

const findManyUsers = async () => {
  const users = await prisma.user.findMany();

  return await Promise.all(
    users.map(async (user) => await attachImage(user, "user"))
  );
};

export default findManyUsers;
