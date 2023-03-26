import { ReactNode } from "react";

interface ModalLayoutProps {
  title: string;
  children: ReactNode;
}

const ModalLayout = ({ title, children }: ModalLayoutProps) => {
  return (
    <div>
      <div className="px-10 text-center py-2 border-b-[1px] border-b-solid border-b-gray-300">
        <div className="font-semibold">{title}</div>
      </div>
      <div className="min-h-[40vh] max-h-[80vh] overflow-y-auto py-2 px-3">
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
