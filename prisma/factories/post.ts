import { faker } from "@faker-js/faker";
import { Prisma, User } from "@prisma/client";
import { fakeUser } from "./user";

export const fakePost = (user?: User): Prisma.PostCreateInput => {
  const caption = faker.lorem.paragraph();
  if (user) {
    return { caption, user: { connect: { id: user.id } } };
  }
  return { caption, user: { create: fakeUser() } };
};
