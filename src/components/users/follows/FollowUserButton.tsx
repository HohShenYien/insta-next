import { followUser, unFollowUser } from "@/api/userFollowers";
import useFollowedUserStore from "@/stores/useFollowedUserStore";
import { unfollowModal } from "@/utils/modals/constants";
import openModal from "@/utils/modals/openModal";
import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface FollowUserButtonProps {
  username: string;
  initialFollow: boolean;
  profilePic: string;
  onChange?: (following: boolean) => void;
}

const FollowUserButton = ({
  username,
  initialFollow,
  profilePic,
  onChange,
}: FollowUserButtonProps) => {
  const {
    followedUser,
    followUser: stateFollowUser,
    unfollowUser: stateUnfollowUser,
  } = useFollowedUserStore();

  const followUserMutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      showNotification({
        message: "You have followed the user!",
        color: "green",
      });
      stateFollowUser(username);
      onChange?.(true);
    },
  });
  const unfollowUserMutation = useMutation({
    mutationFn: unFollowUser,
    onSuccess: () => {
      showNotification({
        message: "You have unfollowed the user!",
        color: "green",
      });
      stateUnfollowUser(username);
      onChange?.(false);
    },
  });
  const following = followedUser[username] ?? initialFollow;
  const mutationFunction = following
    ? unfollowUserMutation
    : followUserMutation;
  const mutate = () => {
    mutationFunction.mutate({ username });
  };

  const { data } = useSession();
  if (data?.user.name === username) {
    return <></>;
  }
  return (
    <>
      {following ? (
        <Button
          className="bg-gray-400 hover:!bg-gray-500"
          classNames={{ root: "h-[unset] !px-5", label: "py-2" }}
          loading={mutationFunction.isLoading}
          onClick={() => {
            openModal({
              type: unfollowModal,
              innerProps: {
                onConfirm: mutate,
                username,
                profilePic,
              },
            });
          }}
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
      )}
    </>
  );
};

export default FollowUserButton;
