import { AttachImage } from "@/features/images/attach-image";
import { UserPostData } from "@/pages/api/users/[username]/posts";
import { User } from "@prisma/client";
import { Unpacked } from "../types";
import {
  createPostModal,
  postLikesModal,
  postModal,
  storyModal,
} from "./constants";

export type ModalInnerProps = {
  [key in typeof postLikesModal]: {
    postId: string;
  };
} & {
  [key in typeof createPostModal]: {};
} & {
  [key in typeof postModal]: {
    postId: string;
  };
} & {
  [key in typeof storyModal]: {
    index: number;
  };
};
