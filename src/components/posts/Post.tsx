import { AttachImage } from "@/features/images/attach-image";
import { Image } from "@mantine/core";
import { Post } from "@prisma/client";

interface PostProps {
  post: AttachImage<Post, "post">;
}

const Post = ({ post: { caption, images, id } }: PostProps) => {
  return (
    <div>
      <p>{caption}</p>
      <div className="grid grid-cols-3">
        {images.map((image, index) => {
          return (
            <Image
              src={image.url}
              alt={caption}
              width="100%"
              key={index}
              className="aspect-square"
              height="100%"
              classNames={{ imageWrapper: "h-full", figure: "h-full" }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Post;
