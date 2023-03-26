import PostLikedModal from "@/components/modals/PostLikedModal";

export const postLikesModal = "PostLikes";
export const createPostModal = "CreatePost";

export type ModalType = typeof postLikesModal | typeof createPostModal;

export const modals = {
  [postLikesModal]: PostLikedModal,
};
