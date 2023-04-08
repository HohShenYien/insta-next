import React, { useMemo, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import SortableImage from "./SortableImage";
import { CreateImageParams } from "@/features/images/createImage/createImage.schema";

interface SortableImageGridProps {
  images: CreateImageParams[];
  setImages: (images: CreateImageParams[]) => void;
  onRemove: (index: number) => void;
}

const SortableImageGrid = ({
  images,
  setImages,
  onRemove,
}: SortableImageGridProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over?.id && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id == active.id);
      const newIndex = items.findIndex((item) => item.id == over.id);
      setImages(arrayMove(images, oldIndex, newIndex));
    }
  }

  const items = useMemo(() => {
    return images.map((image) => ({ id: image.sequence ?? 0, ...image }));
  }, [images]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-3 gap-1 mt-8 max-w-full overflow-hidden">
          {items.map((item, index) => (
            <SortableImage
              key={item.id}
              image={item}
              onRemove={() => onRemove(index)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SortableImageGrid;
