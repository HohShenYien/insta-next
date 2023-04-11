import {
  createModal,
  postLikesModal,
  postModal,
  storyModal,
  unfollowModal,
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
} & {
  [key in typeof unfollowModal]: {
    onConfirm: () => void;
    username: string;
    profilePic: string;
  };
};
