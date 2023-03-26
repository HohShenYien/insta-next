import { PostWithAuthor } from "@/pages/api/posts";
import { durationSinceCreated } from "@/utils/datetime/dateDifference";
import { Avatar, Text } from "@mantine/core";
import { useMemo, useState } from "react";
import ImageCarousel from "../carousel/ImageCarousel";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { formatReadMoreText } from "@/utils/text/format";
import openModal from "@/utils/modals/openModal";
import { postLikesModal } from "@/utils/modals/constants";

interface PostProps {
  post: PostWithAuthor;
}

const Post = ({
  post: {
    caption,
    images,
    user,
    created_at,
    _count: { liked_bys },
    id,
  },
}: PostProps) => {
  const timeSincePosted = useMemo(() => {
    return durationSinceCreated(created_at);
  }, [created_at]);

  const [readMore, setReadMore] = useState(false);

  return (
    <div className="bg-white border-[1px] border-solid border-gray-200 rounded-sm max-w-[480px] py-1">
      <div className="flex items-center px-2">
        <Link href={`/user/${user.username}`}>
          <Avatar
            src={user.profile_pic?.url}
            alt={user.username}
            radius="xl"
            size="md"
            className="mr-3 hover:brightness-125"
          />
        </Link>
        <div className="flex space-x-2 items-center text-[14px]">
          <Link href={`/user/${user.username}`}>
            <Text className="hover:text-gray-700 font-semibold tracking-wider">
              {user.username}
            </Text>
          </Link>
          <Text className="text-gray-500">•</Text>
          <Text className="text-gray-500">{timeSincePosted}</Text>
        </div>
      </div>
      <div className="my-2">
        <ImageCarousel images={images} />
      </div>
      <div className="px-2 text-[14px]">
        <div>
          <button>
            <AiOutlineHeart className="hover:text-gray-500" size="24px" />
          </button>
        </div>
        <button
          className="hover:text-gray-700 font-semibold tracking-wider"
          onClick={() =>
            openModal({
              type: postLikesModal,
              innerProps: {
                postId: id,
              },
            })
          }
        >
          {liked_bys} like{liked_bys > 1 && "s"}
        </button>
        <div>
          <Link href={`/user/${user.username}`} className="mr-1">
            <Text
              span
              className="hover:text-gray-700 font-semibold tracking-wider"
            >
              {user.username}
            </Text>
          </Link>
          <span>{readMore ? caption : formatReadMoreText(caption)}</span>
          {!readMore && (
            <button
              onClick={() => setReadMore(true)}
              className="text-gray-400 hover:text-gray-500 ml-2"
            >
              more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
