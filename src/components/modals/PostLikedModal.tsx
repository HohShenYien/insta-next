import { ContextModalProps } from "@mantine/modals";
import { ModalInnerProps } from "@/utils/modals/types";
import { postLikesModal } from "@/utils/modals/constants";
import ModalLayout from "./ModalLayout";
import { useQuery } from "@tanstack/react-query";
import { getPostLikeds } from "@/api/posts";
import LikedUsersList from "../users/LikedUser/LikedUsersList";

const PostLikedModal = ({
  innerProps: { postId },
}: ContextModalProps<ModalInnerProps[typeof postLikesModal]>) => {
  const likedUsers = useQuery({
    queryFn: () => getPostLikeds(postId),
    queryKey: ["post-likeds"],
  });

  return (
    <ModalLayout title="Likes">
      {likedUsers.isSuccess && <LikedUsersList users={likedUsers.data.users} />}
    </ModalLayout>
  );
};

export default PostLikedModal;
