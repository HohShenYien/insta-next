import { createPostModal, postLikesModal } from "./constants";

export type ModalInnerProps = {
  [key in typeof postLikesModal]: {
    postId: number;
  };
} & {
  [key in typeof createPostModal]: {};
};
