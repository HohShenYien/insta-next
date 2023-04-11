import { modals } from "@mantine/modals";
import {
  ModalType,
  postLikesModal,
  postModal,
  createModal,
  storyModal,
  unfollowModal,
} from "./constants";
import { ModalInnerProps } from "./types";
import { Box, clsx } from "@mantine/core";

interface OpenModalProps<T extends ModalType> {
  type: T;
  innerProps: ModalInnerProps[T];
}

// Here is the mapping of modal name to their specific properties
// I'm taking the properties from the function itself, excluding
// two keys that will be passed for sure
const modalProperties: Record<
  ModalType,
  Omit<Parameters<typeof modals.openContextModal>[0], "modal" | "innerProps">
> = {
  [createModal]: {},
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
    classNames: {
      content: clsx("!overflow-hidden", "bg-neutral-800"),
      close: "!bg-transparent text-white hover:text-gray-400",
    },
  },
  [unfollowModal]: {},
};

function openModal<T extends ModalType>({
  type,
  innerProps,
}: OpenModalProps<T>) {
  modals.openContextModal({
    padding: 0,
    modal: type,
    innerProps,
    closeButtonProps: { size: 28 },
    radius: "lg",
    centered: true,
    scrollAreaComponent: Box as any,
    ...modalProperties[type],
    classNames: {
      header: "absolute bg-transparent top-2 right-2",
      close: "!bg-transparent text-black hover:text-gray-800",
      inner: "overflow-hidden",
      content: "!overflow-hidden",
      ...modalProperties[type].classNames,
    },
  });
}

export default openModal;
