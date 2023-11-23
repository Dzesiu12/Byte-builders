import { Avatar } from "@/modules/profile/components/Avatar";
import { LogoutButton } from "@/modules/profile/components/LogoutButton";
import { getAppServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getAppServerAuthSession();

  if (!session) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findFirst({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <>
      <div className="mb-8 flex gap-2">
        <Avatar className="h-14 w-14" seed={user?.id} />

        <div>
          <p className="text-lg font-bold">
            {user.firstName} {user.lastName}
          </p>
          <p>{user.email}</p>
        </div>
      </div>

      <LogoutButton />
    </>
  );
};

export default ProfilePage;
