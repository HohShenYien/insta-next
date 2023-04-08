import { ReactNode } from "react";
import { clsx } from "@mantine/core";

interface ModalLayoutProps {
  title?: string;
  children: ReactNode;
  padding?: boolean;
}

const ModalLayout = ({ title, children, padding = true }: ModalLayoutProps) => {
  return (
    <div>
      {title && (
        <div className="px-10 text-center py-2 border-b-[1px] border-b-solid border-b-gray-300">
          <div className="font-semibold">{title}</div>
        </div>
      )}
      <div
        className={clsx(
          "min-h-[40vh] max-h-[95vh] overflow-y-auto",
          {
            "py-2 px-3": padding,
            "max-h-[95vh]": !title,
            "max-h-[80vh]": title,
          },
          "relative"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
