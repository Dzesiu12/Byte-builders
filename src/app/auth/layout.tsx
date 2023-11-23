import { Navbar } from "@/modules/layout/Navbar";
import { getAppServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getAppServerAuthSession();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex h-[100svh] flex-col">
      <Navbar />
      <div className="grid flex-1 place-items-center">{children}</div>
    </div>
  );
};

export default AuthLayout;
