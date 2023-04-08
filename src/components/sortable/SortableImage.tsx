import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CreateImageParams } from "@/features/images/createImage/createImage.schema";
import { ActionIcon, Image, Text, clsx } from "@mantine/core";
import styles from "./Sortable.module.css";
import { RxCross2, RxDragHandleDots2 } from "react-icons/rx";

interface SortableImageProps {
  image: CreateImageParams;
  onRemove: () => void;
}

const SortableImage = ({ image, onRemove }: SortableImageProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } =
    // the sequence should always have a value
    useSortable({ id: image.sequence ?? 0 });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={clsx(styles.container, "relative")}
    >
      <Image
        src={image.url}
        alt={image.url}
        fit={"cover"}
        key={image.sequence}
        withPlaceholder
        placeholder={<Text align="center">The image is broken</Text>}
        classNames={{
          root: "aspect-square",
          figure: "h-full",
          imageWrapper: "h-full",
          image: "!h-full",
          placeholder: "bg-gray-100",
        }}
      />
      <div
        className={clsx(
          styles.delete,
          "absolute top-1 right-1 left-1 hidden justify-between"
        )}
      >
        <ActionIcon
          ref={setActivatorNodeRef}
          className="rounded-full text-gray-600 bg-gray-200/75 hover:bg-gray-400/75 cursor-grab active:cursor-grabbing"
          {...listeners}
        >
          <RxDragHandleDots2 />
        </ActionIcon>
        <ActionIcon
          className="rounded-full text-gray-600 bg-gray-200/75 hover:bg-gray-400/75 active:bg-red-200/75 active:text-red-400"
          onClick={(evt) => {
            evt.preventDefault();
            onRemove();
          }}
        >
          <RxCross2 />
        </ActionIcon>
      </div>
    </div>
  );
};

export default SortableImage;
