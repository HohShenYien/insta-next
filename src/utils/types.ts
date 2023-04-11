import { AttachImage } from "@/features/images/attach-image";
import { Prisma } from "@prisma/client";

export type Unpacked<T> = T extends (infer U)[] ? U : T;

export type UserWithFollowersAndImage = AttachImage<
  Prisma.UserGetPayload<{
    include: {
      followers: true;
    };
  }>,
  "user"
>;
