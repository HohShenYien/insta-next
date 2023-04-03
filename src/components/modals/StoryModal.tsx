import { AllStoriesData } from "@/pages/api/stories";
import { storyModal } from "@/utils/modals/constants";
import { ModalInnerProps } from "@/utils/modals/types";
import { ContextModalProps } from "@mantine/modals";
import { useQuery } from "@tanstack/react-query";
import ModalLayout from "./ModalLayout";
import OuterStoryCarousel from "../stories/OuterStoryCarousel";
import { getAllStories } from "@/api/stories";
import Link from "next/link";
import Image from "next/image";

const StoryModal = ({
  innerProps: { index },
}: ContextModalProps<ModalInnerProps[typeof storyModal]>) => {
  // Starting from whatever the index passed
  const { data, isSuccess } = useQuery<AllStoriesData>({
    queryKey: ["all-stories"],
    queryFn: getAllStories,
  });
  return (
    <ModalLayout>
      <div className="flex items-center justify-center overflow-x-hidden">
        {isSuccess && (
          <OuterStoryCarousel stories={data} startingIndex={index} />
        )}
      </div>
      <div className="absolute left-4 top-4">
        <Link href="/">
          <Image
            src="/brand.svg"
            alt="InstaNext"
            height="40"
            width="148"
            style={{ filter: "invert(100%) brightness(200%)" }}
          />
        </Link>
      </div>
    </ModalLayout>
  );
};

export default StoryModal;
