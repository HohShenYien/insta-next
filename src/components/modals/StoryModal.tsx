import { AllStoriesData } from "@/pages/api/stories";
import { storyModal } from "@/utils/modals/constants";
import { ModalInnerProps } from "@/utils/modals/types";
import { ContextModalProps } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ModalLayout from "./ModalLayout";
import InnerStoryCarousel from "../stories/InnerStoryCarousel";

const StoryModal = ({
  innerProps: { index },
}: ContextModalProps<ModalInnerProps[typeof storyModal]>) => {
  // Starting from whatever the index passed
  const [currentIndex, setCurrentIndex] = useState(index);
  const { data, isSuccess } = useQuery<AllStoriesData>({
    queryKey: ["all-stories"],
  });
  return (
    <ModalLayout>
      {isSuccess && (
        <InnerStoryCarousel
          author={data.stories[currentIndex].user}
          stories={data.stories[currentIndex].stories}
        />
      )}
    </ModalLayout>
  );
};

export default StoryModal;
