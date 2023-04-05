import { Image, Text } from "@mantine/core";
import { AllStoriesData } from "@/pages/api/stories";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import InnerStoryCarousel from "./InnerStoryCarousel";
import GradientBorderAvatar from "../avatars/GradientBorderAvatar";

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

interface OuterStoryCarouselProps {
  stories: AllStoriesData;
  startingIndex: number;
}

const OuterStoryCarousel = ({
  stories,
  startingIndex,
}: OuterStoryCarouselProps) => {
  const [emblaApi, setEmblaApi] = useState<Embla | null>(null);
  const [tweenValues, setTweenValues] = useState<number[]>([]);

  useAnimationOffsetEffect(emblaApi, 400);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      if (!emblaApi.slidesInView().includes(index)) return 0.667;
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target().get();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      const tweenValue = 1 - Math.abs(diffToTarget * 2.3);
      return numberWithinRange(tweenValue, 0, 1);
    });
    setTweenValues(styles);
  }, [emblaApi, setTweenValues]);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll();
    emblaApi.on("scroll", () => {
      flushSync(() => onScroll());
    });
    emblaApi.on("reInit", onScroll);
  }, [emblaApi, onScroll]);

  return (
    <Carousel
      height={"90vh"}
      maw={"50vh"}
      classNames={{
        control:
          "p-0 border-0 text-gray-600 data-[inactive=true]:invisible data-[inactive=true]:cursor-default bg-white",
        controls: "absolute-y-center left-[-15%] right-[-15%]",
        viewport: "rounded-sm !overflow-visible",
        root: "overflow-visible",
      }}
      previousControlIcon={<BiChevronLeft size={24} />}
      nextControlIcon={<BiChevronRight size={24} />}
      slideSize={"50vh"}
      draggable={false}
      align={"start"}
      w="50vh"
      slideGap={"0"}
      getEmblaApi={setEmblaApi}
      initialSlide={startingIndex}
    >
      {stories.stories.map((story, index) => (
        <Carousel.Slide key={index} className="origin-center rounded-md">
          <div
            style={{
              ...(tweenValues.length && {
                transform: `scale(${tweenValues[index]})`,
              }),
            }}
          >
            {/* tweenValues will be [NaN] if there's only one value */}
            {tweenValues.length == 1 || tweenValues[index] > 0.99 ? (
              <InnerStoryCarousel author={story.user} stories={story.stories} />
            ) : (
              <div
                className="bg-gray-400 relative rounded-lg overflow-hidden cursor-pointer"
                onClick={() => emblaApi?.scrollTo(index)}
              >
                <Image
                  src={story.stories[0].image.url}
                  alt={story.stories[0].image.url}
                  height={"90vh"}
                  width={"50vh"}
                  fit="contain"
                />
                <div className="absolute top-0 left-0 h-full w-full bg-black/50 flex justify-center items-center">
                  <div className="flex flex-col items-center">
                    <GradientBorderAvatar
                      src={story.user.profile_pic?.url ?? ""}
                      alt={story.user.username}
                      // since the slide is scaled down to 0.667, I want to get
                      // size 54, so 1/0.667 * 54 = 81
                      size={81}
                    />
                    <Text className="font-semibold text-lg tracking-wider text-white mt-2">
                      {story.user.username}
                    </Text>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default OuterStoryCarousel;
