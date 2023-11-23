import { Navbar } from "@/modules/layout/Navbar";
import { getAppServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";

const ProfileLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getAppServerAuthSession();
  if (!session) {
    redirect("/auth/login");
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-10">{children}</div>
    </>
  );
};

export default ProfileLayout;
