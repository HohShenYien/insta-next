import { ReactElement, ReactNode } from "react";
import SideBar from "../sidebar/SideBar";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <main className="pl-[252px]">
      <SideBar />
      <div className="flex justify-center py-12">{children}</div>
    </main>
  );
};

export default function getDefaultLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
}
