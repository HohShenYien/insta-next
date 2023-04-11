import { Avatar, Button } from "@mantine/core";
import Link from "next/link";
import FollowUserButton from "../follows/FollowUserButton";
import { UserWithFollowersAndImage } from "@/utils/types";

interface LikedUserProps {
  user: UserWithFollowersAndImage;
}

const LikedUser = ({ user }: LikedUserProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Link href={`/users/${user.username}`}>
        <Avatar
          src={user.profile_pic?.url}
          alt={user.username}
          radius="xl"
          size="44px"
          className="hover:brightness-125"
        />
      </Link>
      <Link href={`/users/${user.username}`}>
        <div>{user.username}</div>
        <div className="text-gray-500 line-clamp-1 text-sm">
          {user.description}
        </div>
      </Link>
      <div className="flex-1" />
      <FollowUserButton
        username={user.username}
        profilePic={user.profile_pic?.url ?? ""}
        initialFollow={user.followers.length > 0}
      />
    </div>
  );
};

export default LikedUser;
