import { getUserInfo } from "@/api/users";
import { Avatar, Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import FollowUserButton from "./follows/FollowUserButton";
import { useState } from "react";
import useFollowedUserStore from "@/stores/useFollowedUserStore";

const UserInfo = () => {
  const { username } = useRouter().query as { username: string };
  const [actualFollowing, setActualFollowing] = useState(false);
  const { reset } = useFollowedUserStore();
  const { data: userInfo, isSuccess } = useQuery({
    queryFn: () => getUserInfo(username),
    queryKey: ["user-info"],
    enabled: !!username,
    onSuccess: (data) => {
      setActualFollowing(data.user.followers.length > 1);
      reset();
    },
  });

  // I had to extract these out because they are quite neested
  const initialFollow = (userInfo?.user.followers.length ?? 0) > 1;
  const originalFollowerCount = userInfo?.user._count.followers ?? 0;
  const followerCount =
    originalFollowerCount +
    (initialFollow !== actualFollowing ? (actualFollowing ? 1 : -1) : 0);

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
                <FollowUserButton
                  initialFollow={userInfo.user.followers.length > 0}
                  profilePic={userInfo.user.profile_pic?.url ?? ""}
                  username={userInfo.user.username}
                  onChange={(newVal) => setActualFollowing(newVal)}
                />
              </div>
              <div className="flex space-x-12 mb-6">
                <div>
                  <b>{userInfo.user._count.posts}</b> posts
                </div>
                <div className="cursor-pointer">
                  <b>{followerCount}</b> followers
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
