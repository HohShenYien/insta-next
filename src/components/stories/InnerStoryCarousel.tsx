import { AttachImage } from "@/features/images/attach-image";
import { durationSinceCreated } from "@/utils/datetime/dateDifference";
import { Embla, useAnimationOffsetEffect, Carousel } from "@mantine/carousel";
import { Avatar, Image, Text } from "@mantine/core";
import { Story, User } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { IoChevronBackCircle, IoChevronForwardCircle } from "react-icons/io5";

interface InnerStoryCarouselProps {
  author: AttachImage<User, "user">;
  stories: AttachImage<Story, "story">[];
}

const InnerStoryCarousel = ({ author, stories }: InnerStoryCarouselProps) => {
  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState<Embla | null>(null);

  // This is needed to solve misaligning slides from Mantine
  // https://mantine.dev/others/carousel/#carousel-container-animation-offset
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  return (
    <div className="relative">
      <Carousel
        withIndicators
        height={"90vh"}
        maw={"50vh"}
        classNames={{
          control:
            "p-0 border-0 text-white/80 blur-[0.5px] backdrop-blur-sm data-[inactive=true]:invisible data-[inactive=true]:cursor-default",
          indicator: "bg-white h-1",
          indicators: "top-4 bottom-[unset] px-4 gap-x-2",
          viewport: "rounded-sm",
        }}
        styles={{
          indicator: {
            width: `calc(${100 / stories.length}%)`,
          },
        }}
        // changed to match Instagram style
        previousControlIcon={<IoChevronBackCircle size={30} />}
        nextControlIcon={<IoChevronForwardCircle size={30} />}
        slideSize={"50vh"}
        slidesToScroll={1}
        draggable={false}
        getEmblaApi={setEmbla}
      >
        {stories.map((story, index) => {
          return (
            <Carousel.Slide key={index}>
              <div className="bg-gray-400">
                <Image
                  src={story.image.url}
                  alt={story.image.url}
                  height={"90vh"}
                  width={"50vh"}
                  fit="contain"
                />
              </div>
            </Carousel.Slide>
          );
        })}
      </Carousel>
      <div className="absolute top-8">
        <div className="flex items-center px-2">
          <Link href={`/users/${author.username}`}>
            <Avatar
              src={author.profile_pic?.url}
              alt={author.username}
              radius="xl"
              size="md"
              className="mr-3 hover:brightness-125"
            />
          </Link>
          <div className="flex space-x-2 items-center text-[14px]">
            <Link href={`/users/${author.username}`}>
              <Text className="font-semibold tracking-wider">
                {author.username}
              </Text>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnerStoryCarousel;
