import { getUserInfo } from "@/api/users";
import { Avatar, Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const UserInfo = () => {
  const { username } = useRouter().query as { username: string };
  const { data: userInfo, isSuccess } = useQuery({
    queryFn: () => getUserInfo(username),
    queryKey: ["user-info"],
    enabled: !!username,
  });

  return (
    <div>
      {isSuccess && (
        <div>
          <div className="flex space-x-8">
            <div className="flex items-center justify-center flex-1">
              <Avatar
                src={userInfo.user.profile_pic?.url}
                alt={userInfo.user.username}
                size="150px"
                classNames={{ root: "rounded-full" }}
                className="border-solid border-[1px] border-gray-500"
              />
            </div>
            <div className="flex-[2]">
              <div className="flex items-end mb-8 space-x-8">
                <div className="text-xl">{userInfo.user.username}</div>
                <Button
                  className="bg-blue-500 hover:bg-blue-600"
                  classNames={{ root: "h-[unset] py-1.5 !px-5" }}
                >
                  Follow
                </Button>
              </div>
              <div className="flex space-x-12 mb-6">
                <div>
                  <b>{userInfo.user._count.posts}</b> posts
                </div>
                <div className="cursor-pointer">
                  <b>{userInfo.user._count.followers}</b> followers
                </div>
                <div className="cursor-pointer">
                  <b>{userInfo.user._count.followings}</b> following
                </div>
              </div>
              <div className="text-sm">{userInfo.user.description}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
