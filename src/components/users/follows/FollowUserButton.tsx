import { followUser, unFollowUser } from "@/api/userFollowers";
import { unfollowModal } from "@/utils/modals/constants";
import openModal from "@/utils/modals/openModal";
import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface FollowUserButtonProps {
  username: string;
  initialFollow: boolean;
  profilePic: string;
}

const FollowUserButton = ({
  username,
  initialFollow,
  profilePic,
}: FollowUserButtonProps) => {
  const [following, setFollowing] = useState(initialFollow);

  const followUserMutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      showNotification({
        message: "You have followed the user!",
        color: "green",
      });
      setFollowing(true);
    },
  });
  const unfollowUserMutation = useMutation({
    mutationFn: unFollowUser,
    onSuccess: () => {
      showNotification({
        message: "You have unfollowed the user!",
        color: "green",
      });
      setFollowing(false);
    },
  });
  const mutationFunction = following
    ? unfollowUserMutation
    : followUserMutation;
  const mutate = () => {
    mutationFunction.mutate({ username });
  };
  return following ? (
    <Button
      className="bg-gray-400 hover:!bg-gray-500"
      classNames={{ root: "h-[unset] !px-5", label: "py-2" }}
      // what to do here?
      onClick={() =>
        openModal({
          type: unfollowModal,
          innerProps: { username, profilePic, onConfirm: mutate },
        })
      }
      loading={mutationFunction.isLoading}
    >
      Following
    </Button>
  ) : (
    <Button
      className="bg-blue-500 hover:!bg-blue-600 text-white"
      classNames={{ root: "h-[unset] !px-5", label: "py-2" }}
      onClick={mutate}
      loading={mutationFunction.isLoading}
    >
      Follow
    </Button>
  );
};

export default FollowUserButton;
