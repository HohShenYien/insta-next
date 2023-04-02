import { getUserPosts } from "@/api/posts";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import UserPost from "./UserPost";

const UserPosts = () => {
  const { username } = useRouter().query as { username: string };
  const { data, isSuccess } = useQuery({
    queryFn: () => getUserPosts(username),
    queryKey: ["user-posts"],
    enabled: !!username,
  });

  return (
    <div className="grid grid-cols-3 gap-2">
      {isSuccess &&
        data.posts.map((post, index) => <UserPost key={index} post={post} />)}
    </div>
  );
};

export default UserPosts;
