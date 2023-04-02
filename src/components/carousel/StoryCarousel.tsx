import { Carousel, Embla } from "@mantine/carousel";
import { Image, Text } from "@mantine/core";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { getAllStories } from "@/api/stories";
import openModal from "@/utils/modals/openModal";
import { storyModal } from "@/utils/modals/constants";

const StoryCarousel = () => {
  const { isSuccess, data: stories } = useQuery({
    queryFn: getAllStories,
    queryKey: ["all-stories"],
  });

  return (
    <Carousel
      height={120}
      maw={630}
      classNames={{
        control:
          "p-0 border-0 text-gray-600 data-[inactive=true]:invisible data-[inactive=true]:cursor-default bg-white",
        controls: "top-[20px]",
        viewport: "rounded-sm",
      }}
      previousControlIcon={<BiChevronLeft size={24} />}
      nextControlIcon={<BiChevronRight size={24} />}
      slideSize={70}
      slidesToScroll={4}
      draggable={false}
      align={"start"}
      w="630"
      slideGap={"sm"}
      // this is to prevent over-scrolling, which is default behaviour
      containScroll="trimSnaps"
    >
      {isSuccess &&
        stories.stories.map((story, index) => {
          return (
            <Carousel.Slide key={index}>
              <div
                className="flex flex-col items-center space-y-2 cursor-pointer"
                onClick={() =>
                  openModal({ type: storyModal, innerProps: { index } })
                }
              >
                {/* This part is for the Instagram gradient ring */}
                <div className="bg-gradient-to-bl from-[#D300C5] to-[#FFCE29] rounded-full p-0.5">
                  <Image
                    src={story.user.profile_pic?.url}
                    alt={story.user.username}
                    height={56}
                    width={56}
                    fit="cover"
                    className="rounded-full"
                    classNames={{
                      root: "bg-white p-0.5 !w-[unset]",
                      image: "rounded-full",
                    }}
                  />
                </div>
                <Text className="text-sm truncate w-[70px] text-center">
                  {story.user.username}
                </Text>
              </div>
            </Carousel.Slide>
          );
        })}
    </Carousel>
  );
};

export default StoryCarousel;
