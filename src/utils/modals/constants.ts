export const postLikesModal = "PostLikes";
export const postModal = "Post";
export const createModal = "Create";
export const storyModal = "Story";

export type ModalType =
  | typeof postLikesModal
  | typeof createModal
  | typeof postModal
  | typeof storyModal;
