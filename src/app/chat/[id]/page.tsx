import { ChatWindow } from "@/modules/chat/components/ChatWindow";
import { Avatar } from "@/modules/profile/components/Avatar";
import { getAppServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { RiCloseFill } from "react-icons/ri";

const ChatPage = async ({ params }: { params: { id: string } }) => {
  const session = await getAppServerAuthSession();
  const chat = await prisma.chat.findFirst({
    where: { id: params.id },
    include: { messages: true, ad: true, owner: true, creator: true },
  });

  if (!session) {
    return redirect("/auth/login");
  }

  if (!chat) {
    return notFound();
  }

  const user = chat.creatorId === session.user.id ? chat.owner : chat.creator;

  return (
    <div className="flex h-full w-full flex-col rounded-xl border">
      <div className="flex justify-between gap-4 border-b px-8 py-4">
        <div className="flex gap-2 rounded-xl">
          <Avatar className="h-12 w-12" seed={user.id} />

          <div>
            <p className="font-medium">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm">{chat.ad.title}</p>
          </div>
        </div>

        <Link className="btn" href="/chat">
          <RiCloseFill />
        </Link>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden px-4 pb-4">
        <ChatWindow
          chatId={chat.id}
          currentUserId={session.user.id}
          messages={chat.messages}
        />
      </div>
    </div>
  );
};

export default ChatPage;
