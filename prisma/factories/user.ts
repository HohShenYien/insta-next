import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";

export const fakeUser = (): Prisma.UserCreateInput => ({
  username: faker.name.firstName() + faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  description: faker.lorem.paragraph(),
});
