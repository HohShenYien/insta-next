import { modals } from "@mantine/modals";
import {
  ModalType,
  postLikesModal,
  postModal,
  createPostModal,
  storyModal,
} from "./constants";
import { ModalInnerProps } from "./types";

interface OpenModalProps<T extends ModalType> {
  type: T;
  innerProps: ModalInnerProps[T];
}

// Here is the mapping of modal name to their specific properties
// I'm taking the properties from the function itself, excluding
// two kkeys that will be passed for sure
const modalProperties: Record<
  ModalType,
  Omit<Parameters<typeof modals.openContextModal>[0], "modal" | "innerProps">
> = {
  [createPostModal]: {},
  [postLikesModal]: {
    size: "sm",
  },
  [postModal]: {
    size: "1200px",
    withCloseButton: false,
    radius: "md",
  },
  [storyModal]: {
    fullScreen: true,
  },
};

function openModal<T extends ModalType>({
  type,
  innerProps,
}: OpenModalProps<T>) {
  modals.openContextModal({
    padding: 0,
    modal: type,
    innerProps,
    classNames: {
      header: "absolute bg-transparent top-2 right-2",
      close: "!bg-transparent text-black hover:text-gray-800",
    },
    closeButtonProps: { size: 28 },
    radius: "lg",
    centered: true,
    ...modalProperties[type],
  });
}

export default openModal;
