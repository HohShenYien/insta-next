import { clsx } from "@mantine/core";
import Link from "next/link";
import { IconType } from "react-icons";

interface SideBarButtonProps {
  href?: string;
  // this is for future use
  onClick?: () => void;
  Icon: IconType;
  text: string;
  isActive?: boolean;
}

const SideBarButton = ({
  href = "#",
  onClick = () => null,
  Icon,
  text,
  isActive = false,
}: SideBarButtonProps) => {
  return (
    <Link href={href} className="block" onClick={onClick}>
      <button
        className={clsx(
          "rounded-full p-3 hover:bg-gray-100 w-full flex transition-all items-center space-x-3",
          {
            "font-bold": isActive,
            "font-normal": !isActive,
          }
        )}
        color="gray"
      >
        <Icon size="25px" />
        <div className="text-black">{text}</div>
      </button>
    </Link>
  );
};

export default SideBarButton;
