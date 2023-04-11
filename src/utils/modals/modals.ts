import PostLikedModal from "@/components/modals/PostLikedModal";
import PostModal from "@/components/modals/PostModal";
import {
  createModal,
  postLikesModal,
  postModal,
  storyModal,
  unfollowModal,
} from "./constants";
import StoryModal from "@/components/modals/StoryModal";
import CreateModal from "@/components/modals/CreateModal";
import UnfollowUserModal from "@/components/modals/UnfollowUserModal";

export const modals = {
  [postLikesModal]: PostLikedModal,
  [postModal]: PostModal,
  [storyModal]: StoryModal,
  [createModal]: CreateModal,
  [unfollowModal]: UnfollowUserModal,
};
