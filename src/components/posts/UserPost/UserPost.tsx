import { UserPostData } from "@/pages/api/users/[username]/posts";
import { Unpacked } from "@/utils/types";
import { Image } from "@mantine/core";
import { IoCopy } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import openModal from "@/utils/modals/openModal";
import { postModal } from "@/utils/modals/constants";

interface UserPostProps {
  post: Unpacked<UserPostData["posts"]>;
}

const UserPost = ({ post }: UserPostProps) => {
  return (
    <div
      className="relative cursor-pointer"
      onClick={() =>
        openModal({
          type: postModal,
          innerProps: {
            postId: post.id,
          },
        })
      }
    >
      <Image
        src={post.images[0].url}
        alt={post.images[0].url}
        classNames={{ image: "aspect-square" }}
        width="100%"
      />
      {post.images.length > 1 && (
        <div className="absolute top-2 right-2">
          <IoCopy className="text-white" size="20px" />
        </div>
      )}
      <div className="absolute top-0 left-0 h-full w-full bg-black/40 flex justify-center items-center opacity-0 hover:opacity-100 transition-all">
        <div className="text-white flex items-center">
          <FaHeart className="mr-2" /> {post._count.liked_bys}
        </div>
      </div>
    </div>
  );
};

export default UserPost;
