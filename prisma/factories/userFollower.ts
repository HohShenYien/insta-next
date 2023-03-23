import { Prisma, User } from "@prisma/client";

// alternatively can make both as optional, and create new relations if absent
export const fakeUserFollower = (
  user: User,
  follower: User
): Prisma.UserFollowerCreateInput => ({
  user: { connect: { id: user.id } },
  follower: { connect: { id: follower.id } },
});
