import { AiOutlineHome, AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { ImSearch } from "react-icons/im";
import { BsPlusSquare, BsFillPlusSquareFill } from "react-icons/bs";
import { RiUser3Line, RiUser3Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import SideBarButton from "./SideBarButton";
import { signOut, useSession } from "next-auth/react";
import openModal from "@/utils/modals/openModal";
import { createModal } from "@/utils/modals/constants";

const links = [
  { name: "Home", route: "/", IconLine: AiOutlineHome, IconFilled: AiFillHome },
  {
    name: "Search",
    route: "/search",
    IconLine: AiOutlineSearch,
    IconFilled: ImSearch,
  },
  {
    name: "Create",
    route: "/#create-modal",
    IconLine: BsPlusSquare,
    IconFilled: BsFillPlusSquareFill,
    onClick: () =>
      openModal({
        type: createModal,
        innerProps: {},
      }),
  },
];

const SideBar = () => {
  const router = useRouter();
  const currentPath = router.asPath;
  const session = useSession();

  return (
    <div className="w-[244px] fixed left-0 top-0 h-full px-4 py-6 border-r-[1px] border-solid border-gray-300">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col items-center">
          <Link href="/">
            <Image src="/brand.svg" alt="InstaNext" height="120" width="140" />
          </Link>
          <div className="space-y-2 w-full mt-12">
            {links.map((link, index) => {
              const isActive = link.route == currentPath;
              return (
                <SideBarButton
                  key={index}
                  Icon={isActive ? link.IconFilled : link.IconLine}
                  text={link.name}
                  href={link.route}
                  isActive={isActive}
                  onClick={link.onClick}
                />
              );
            })}
            <SideBarButton
              Icon={
                currentPath == `/users/${session.data?.user.name}`
                  ? RiUser3Fill
                  : RiUser3Line
              }
              text={"Profile"}
              href={`/users/${session.data?.user.name}`}
              isActive={currentPath == `/users/${session.data?.user.name}`}
            />
          </div>
        </div>
        <SideBarButton
          text="Logout"
          Icon={FiLogOut}
          onClick={() => signOut()}
        />
      </div>
    </div>
  );
};

export default SideBar;
