"use client";

import { type Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { MessageList } from "./MessageList";
import { MessageForm } from "./MessageForm";

type Props = {
  chatId: string;
  currentUserId: string;
  messages: Message[];
};

export const ChatWindow = ({ chatId, currentUserId, messages }: Props) => {
  const router = useRouter();
  const messageListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current.scrollHeight,
    });

    const interval = setInterval(() => {
      router.refresh();
    }, 5000);

    return clearInterval(interval);
  }, [router]);

  const handleMessageSubmit = () => {
    router.refresh();
  };

  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden px-4 pb-4">
      <div
        ref={messageListRef}
        className="flex flex-1 flex-col overflow-auto pt-4"
      >
        {messages.length > 0 ? (
          <MessageList currentUserId={currentUserId} messages={messages} />
        ) : (
          <p className="text-center text-gray-400">Rozpocznij rozmowę</p>
        )}
      </div>

      <MessageForm chatId={chatId} onSubmit={handleMessageSubmit} />
    </div>
  );
};
