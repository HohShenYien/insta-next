import { Image } from "@mantine/core";

interface GradientBorderAvatarProps {
  src: string;
  alt: string;
  size: number;
}

const GradientBorderAvatar = ({
  src,
  alt,
  size,
}: GradientBorderAvatarProps) => {
  return (
    <div className="bg-gradient-to-bl from-[#D300C5] to-[#FFCE29] rounded-full p-0.5">
      <Image
        src={src}
        alt={alt}
        height={size}
        width={size}
        fit="cover"
        className="rounded-full"
        classNames={{
          root: "bg-white p-0.5 !w-[unset]",
          image: "rounded-full",
        }}
      />
    </div>
  );
};

export default GradientBorderAvatar;
