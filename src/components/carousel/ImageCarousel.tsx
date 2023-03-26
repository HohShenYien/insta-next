import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import { Image as ImageType } from "@prisma/client";
import { IoChevronBackCircle, IoChevronForwardCircle } from "react-icons/io5";
import { useMemo } from "react";

interface ImageCarouselProps {
  images: ImageType[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  // Make sure it's well sorted
  const sortedImages = useMemo(() => {
    return images.sort((a, b) => a.sequence - b.sequence);
  }, [images]);

  return (
    <Carousel
      withIndicators
      height={480}
      maw={480}
      classNames={{
        control:
          "p-0 border-0 text-white/80 blur-[0.5px] backdrop-blur-sm data-[inactive=true]:invisible data-[inactive=true]:cursor-default",
        indicator: "bg-white w-2 h-2",
        viewport: "rounded-sm",
      }}
      // changed to match Instagram style
      previousControlIcon={<IoChevronBackCircle size={30} />}
      nextControlIcon={<IoChevronForwardCircle size={30} />}
    >
      {sortedImages.map((image, index) => {
        return (
          <Carousel.Slide key={index}>
            <Image
              src={image.url}
              alt={image.url}
              height="480"
              width="480"
              fit="cover"
            />
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};

export default ImageCarousel;
