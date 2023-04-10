import { likePost, unlikePost } from "@/api/postLikes";
import openModal from "@/utils/modals/openModal";
import { ActionIcon } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface PostLikedProps {
  likedBy: number;
  postId: string;
  className?: string;
  initialLiked: boolean;
}

const PostLiked = ({
  likedBy,
  postId,
  initialLiked,
  className = "",
}: PostLikedProps) => {
  // useState here as it'll be changed during mutation
  const [liked, setLiked] = useState(initialLiked);

  const likePostMutation = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      showNotification({
        message: "You have liked the post!",
        color: "green",
      });
      setLiked(true);
    },
  });
  const unlikePostMutation = useMutation({
    mutationFn: unlikePost,
    onSuccess: () => {
      showNotification({
        message: "You have unliked the post!",
        color: "green",
      });
      setLiked(false);
    },
  });

  const mutationFunction = liked ? unlikePostMutation : likePostMutation;

  // Need to adjust since it takes time to refetch the post,
  // So before the count is updated, we either add one or subtract one
  // based on the liked state, if it isn't updated, which is when
  // the initialLiked and liked don't match
  const likedByCount =
    likedBy + (liked !== initialLiked ? (liked ? 1 : -1) : 0);

  return (
    <>
      <div>
        <ActionIcon
          variant="subtle"
          onClick={() => {
            mutationFunction.mutate({ postId });
          }}
          loading={mutationFunction.isLoading}
        >
          {liked ? (
            <AiFillHeart
              className="text-red-500 hover:text-red-700"
              size="24px"
            />
          ) : (
            <AiOutlineHeart className="hover:text-gray-500" size="24px" />
          )}
        </ActionIcon>
      </div>
      <button
        className={
          "hover:text-gray-700 font-semibold tracking-wider" + className
        }
        onClick={() =>
          openModal({
            type: "PostLikes",
            innerProps: {
              postId,
            },
          })
        }
      >
        {likedByCount} like{likedByCount > 1 && "s"}
      </button>
    </>
  );
};

export default PostLiked;
