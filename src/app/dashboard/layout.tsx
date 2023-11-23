import { Navbar } from "@/modules/layout/Navbar";
import { type ReactNode } from "react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
