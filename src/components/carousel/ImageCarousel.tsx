import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import { Image } from "@mantine/core";
import { Image as ImageType } from "@prisma/client";
import { IoChevronBackCircle, IoChevronForwardCircle } from "react-icons/io5";
import { useMemo, useState } from "react";

interface ImageCarouselProps {
  images: ImageType[];
  size?: string | number;
}

const ImageCarousel = ({ images, size = 480 }: ImageCarouselProps) => {
  // Make sure it's well sorted
  const sortedImages = useMemo(() => {
    return images.sort((a, b) => a.sequence - b.sequence);
  }, [images]);

  const [embla, setEmbla] = useState<Embla | null>(null);

  // This is needed to solve misaligning slides from Mantine
  // https://mantine.dev/others/carousel/#carousel-container-animation-offset
  useAnimationOffsetEffect(embla, 200);

  return (
    <Carousel
      withIndicators
      height={size}
      maw={size}
      classNames={{
        control:
          "p-0 border-0 text-white/80 blur-[0.5px] backdrop-blur-sm data-[inactive=true]:invisible data-[inactive=true]:cursor-default",
        indicator: "bg-white w-2 h-2",
        viewport: "rounded-sm",
      }}
      // changed to match Instagram style
      previousControlIcon={<IoChevronBackCircle size={30} />}
      nextControlIcon={<IoChevronForwardCircle size={30} />}
      slideSize={size}
      slidesToScroll={1}
      draggable={false}
      getEmblaApi={setEmbla}
    >
      {sortedImages.map((image, index) => {
        return (
          <Carousel.Slide key={index}>
            <Image
              src={image.url}
              alt={image.url}
              height={size}
              width={size}
              fit="cover"
            />
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};

export default ImageCarousel;
