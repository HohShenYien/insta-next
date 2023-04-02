export const postLikesModal = "PostLikes";
export const postModal = "Post";
export const createPostModal = "CreatePost";
export const storyModal = "Story";

export type ModalType =
  | typeof postLikesModal
  | typeof createPostModal
  | typeof postModal
  | typeof storyModal;
