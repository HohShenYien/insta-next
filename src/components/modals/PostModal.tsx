import { postModal } from "@/utils/modals/constants";
import { ModalInnerProps } from "@/utils/modals/types";
import { ContextModalProps } from "@mantine/modals";
import ModalLayout from "./ModalLayout";
import ImageCarousel from "../carousel/ImageCarousel";
import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "@/api/posts";
import Link from "next/link";
import { Avatar, Text } from "@mantine/core";
import { durationSinceCreated } from "@/utils/datetime/dateDifference";
import PostLiked from "../posts/Liked/PostLiked";

const PostModal = ({
  innerProps: { postId },
}: ContextModalProps<ModalInnerProps[typeof postModal]>) => {
  const { data: post, isSuccess } = useQuery({
    queryFn: () => getSinglePost(postId),
    // making sure each post has different cache
    queryKey: ["single-post", postId],
  });
  return (
    <ModalLayout padding={false}>
      {isSuccess && (
        <div className="grid grid-cols-2">
          <ImageCarousel images={post.post.images} size="600" />
          <div className="py-2 px-4 flex flex-col h-full justify-between">
            <div className="flex items-start">
              <Link href={`/users/${post.author.username}`}>
                <Avatar
                  src={post.author.profile_pic?.url}
                  alt={post.author.username}
                  radius="xl"
                  size="md"
                  className="hover:brightness-125"
                />
              </Link>
              <div className="ml-3 text-sm">
                <Link href={`/users/${post.author.username}`}>
                  <Text
                    span
                    className="hover:text-gray-700 font-semibold tracking-wider leading-3"
                  >
                    {post.author.username}
                  </Text>
                </Link>
                <Text span className="pl-3 leading-3">
                  {post.post.caption}
                </Text>
                <div className="mt-2 text-gray-400">
                  {durationSinceCreated(post.post.created_at)}
                </div>
              </div>
            </div>
            <div>
              <PostLiked postId={postId} likedBy={post.post._count.liked_bys} />
            </div>
          </div>
        </div>
      )}
    </ModalLayout>
  );
};

export default PostModal;
