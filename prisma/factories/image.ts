import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";

export const fakeImage = (
  associated_id: number,
  type: string,
  sequence: number = 0
): Prisma.ImageCreateInput => ({
  type,
  associated_id,
  sequence,
  url: faker.image.image(),
});
