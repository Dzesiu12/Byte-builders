import { Navbar } from "@/modules/layout/Navbar";
import { Avatar } from "@/modules/profile/components/Avatar";
import { getAppServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { type User, type Chat, type Ad } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";

type ChatItemProps = {
  currentUserId: string;
  chat: Chat & {
    creator: User;
    owner: User;
    ad: Ad;
  };
};

const ChatItem = ({ chat, currentUserId }: ChatItemProps) => {
  const user = chat.creatorId === currentUserId ? chat.owner : chat.creator;

  return (
    <Link
      className="flex gap-2 rounded-xl p-4 transition hover:bg-gray-100"
      href={`/chat/${chat.id}`}
    >
      <Avatar className="h-12 w-12" seed={user.id} />

      <div>
        <p className="font-medium">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-sm">{chat.ad.title}</p>
      </div>
    </Link>
  );
};

const ProfileChatLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getAppServerAuthSession();
  if (!session) {
    redirect("/auth/login");
  }

  const chats = await prisma.chat.findMany({
    where: {
      OR: [{ ownerId: session.user.id }, { creatorId: session.user.id }],
    },
    include: {
      creator: true,
      owner: true,
      ad: true,
    },
  });

  return (
    <div className="flex h-[100svh] flex-col overflow-hidden">
      <Navbar />

      <div className="container mx-auto flex flex-1 gap-8 overflow-hidden px-4 py-10">
        <div className="w-full max-w-sm flex-shrink-0 overflow-auto rounded-xl border">
          <h1 className="sticky top-0 bg-white px-8 pb-4 pt-8 text-2xl font-bold">
            Aktywne chaty
          </h1>

          {chats.length > 0 ? (
            <div className="flex flex-col px-4 pb-4">
              {chats.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  currentUserId={session.user.id}
                />
              ))}
            </div>
          ) : (
            <div className="mt-4 px-8">
              <p className="text-gray-600">Brak aktywnych chatów.</p>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default ProfileChatLayout;
