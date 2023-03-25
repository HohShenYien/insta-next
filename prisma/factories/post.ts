import { faker } from "@faker-js/faker";
import { Prisma, User } from "@prisma/client";
import { fakeUser } from "./user";

export const fakePost = (user?: User): Prisma.PostCreateInput => {
  const caption = faker.lorem.paragraph();
  const created_at = faker.date.recent(15).toISOString();

  if (user) {
    return { caption, user: { connect: { id: user.id } }, created_at };
  }
  return { caption, user: { create: fakeUser() }, created_at };
};
