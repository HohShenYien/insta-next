import { followUser, unFollowUser } from "@/api/userFollowers";
import UnfollowUserModal from "@/components/modals/UnfollowUserModal";
import { unfollowModal } from "@/utils/modals/constants";
import openModal from "@/utils/modals/openModal";
import { Button, Modal, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";

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
  const [following, setFollowing] = useState(initialFollow);
  const [showModal, { open, close }] = useDisclosure(false);

  const followUserMutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      showNotification({
        message: "You have followed the user!",
        color: "green",
      });
      setFollowing(true);
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
      setFollowing(false);
      onChange?.(false);
    },
  });
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
          onClick={open}
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
      )}
      {/* Added an ugly modal here, to be fixed */}
      <Modal
        opened={showModal}
        padding={0}
        closeButtonProps={{ size: 28 }}
        radius="lg"
        centered={true}
        onClose={close}
        scrollAreaComponent={Box as any}
        classNames={{
          header: "absolute bg-transparent top-2 right-2",
          close: "!bg-transparent text-black hover:text-gray-800",
          inner: "overflow-hidden z-[300]",
          content: "!overflow-hidden",
        }}
      >
        <UnfollowUserModal
          innerProps={{ username, profilePic, onConfirm: mutate }}
          onClose={close}
        />
      </Modal>
    </>
  );
};

export default FollowUserButton;
