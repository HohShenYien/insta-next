import PostLikedModal from "@/components/modals/PostLikedModal";
import PostModal from "@/components/modals/PostModal";
import { postLikesModal, postModal, storyModal } from "./constants";
import StoryModal from "@/components/modals/StoryModal";

export const modals = {
  [postLikesModal]: PostLikedModal,
  [postModal]: PostModal,
  [storyModal]: StoryModal,
};
