import PostLikedModal from "@/components/modals/PostLikedModal";
import PostModal from "@/components/modals/PostModal";
import {
  createModal,
  postLikesModal,
  postModal,
  storyModal,
} from "./constants";
import StoryModal from "@/components/modals/StoryModal";
import CreateModal from "@/components/modals/CreateModal";

export const modals = {
  [postLikesModal]: PostLikedModal,
  [postModal]: PostModal,
  [storyModal]: StoryModal,
  [createModal]: CreateModal,
};
