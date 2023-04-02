import { AttachImage } from "@/features/images/attach-image";
import { Avatar, Button } from "@mantine/core";
import { User } from "@prisma/client";
import Link from "next/link";

interface LikedUserProps {
  user: AttachImage<User, "user">;
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
      <Button
        className="bg-blue-500 hover:bg-blue-600"
        classNames={{ root: "h-[unset] py-2 !px-5" }}
      >
        Follow
      </Button>
    </div>
  );
};

export default LikedUser;
