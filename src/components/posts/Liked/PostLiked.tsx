import openModal from "@/utils/modals/openModal";
import { AiOutlineHeart } from "react-icons/ai";

interface PostLikedProps {
  likedBy: number;
  postId: number;
  className?: string;
}

const PostLiked = ({ likedBy, postId, className = "" }: PostLikedProps) => {
  return (
    <>
      <div>
        <button>
          <AiOutlineHeart className="hover:text-gray-500" size="24px" />
        </button>
      </div>
      <button
        className={
          "hover:text-gray-700 font-semibold tracking-wider" + className
        }
        onClick={() =>
          openModal({
            type: "PostLikes",
            innerProps: {
              postId,
            },
          })
        }
      >
        {likedBy} like{likedBy > 1 && "s"}
      </button>
    </>
  );
};

export default PostLiked;
