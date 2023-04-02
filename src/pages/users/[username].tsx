import UserPosts from "@/components/posts/UserPost/UserPosts";
import UserInfo from "@/components/users/UserInfo";

const ProfilePage = () => {
  return (
    <div className="max-w-[940px] space-y-20">
      <UserInfo />
      <UserPosts />
    </div>
  );
};

export default ProfilePage;
