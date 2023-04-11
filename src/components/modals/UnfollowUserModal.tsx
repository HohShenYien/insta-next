import { unfollowModal } from "@/utils/modals/constants";
import { ModalInnerProps } from "@/utils/modals/types";
import { ContextModalProps, closeModal } from "@mantine/modals";
import ModalLayout from "./ModalLayout";
import { Avatar } from "@mantine/core";

const UnfollowUserModal = ({
  innerProps: { onConfirm, username, profilePic },
  id,
}: ContextModalProps<ModalInnerProps[typeof unfollowModal]>) => {
  return (
    <ModalLayout padding={false}>
      <div className="px-6 py-8 space-y-4 flex flex-col items-center">
        <Avatar
          src={profilePic}
          alt={username}
          size="150px"
          classNames={{ root: "rounded-full" }}
          className="border-solid border-[1px] border-gray-500"
        />
        <p>Unfollow @{username}?</p>
      </div>
      <div className="flex flex-col items-stretch">
        <button
          className="py-4 font-semibold text-red-500 hover:bg-red-50 border-t-2 border-solid border-gray-200 active:bg-red-100"
          onClick={onConfirm}
        >
          Unfollow
        </button>
        <button
          className="py-4 hover:bg-gray-100 active:bg-gray-200 border-t-2 border-solid border-gray-200"
          onClick={() => closeModal(id)}
        >
          Cancel
        </button>
      </div>
    </ModalLayout>
  );
};

export default UnfollowUserModal;
