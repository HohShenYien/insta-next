import { modals } from "@mantine/modals";
import { ModalType } from "./constants";
import { ModalInnerProps } from "./types";

interface OpenModalProps<T extends ModalType> {
  type: T;
  innerProps: ModalInnerProps[T];
}

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
    size: "sm",
  });
}

export default openModal;
