import { AttachImage } from "@/features/images/attach-image";
import { User } from "@prisma/client";
import LikedUser from "./LikedUser";
import { UserWithFollowersAndImage } from "@/utils/types";

interface LikedUsersListProps {
  users: UserWithFollowersAndImage[];
}

const LikedUsersList = ({ users }: LikedUsersListProps) => {
  return (
    <div className="space-y-4">
      {users.map((user, index) => {
        return <LikedUser key={index} user={user} />;
      })}
    </div>
  );
};

export default LikedUsersList;
