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
  // I changed to use unsplash as the default loremflickr
  // was down when I was doing other parts
  url: faker.image.unsplash.image(),
});
