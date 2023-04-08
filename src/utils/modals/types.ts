import {
  createModal,
  postLikesModal,
  postModal,
  storyModal,
} from "./constants";

export type ModalInnerProps = {
  [key in typeof postLikesModal]: {
    postId: string;
  };
} & {
  [key in typeof createModal]: {};
} & {
  [key in typeof postModal]: {
    postId: string;
  };
} & {
  [key in typeof storyModal]: {
    index: number;
  };
};
