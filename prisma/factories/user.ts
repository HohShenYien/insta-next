import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";

export const fakeUser = (): Prisma.UserCreateInput => ({
  username: faker.name.firstName() + faker.name.lastName(),
  email: faker.internet.email(),
  // using hashSync here so that this function doesn't become async
  password: hashSync("secret", 12),
  description: faker.lorem.paragraph(),
});
