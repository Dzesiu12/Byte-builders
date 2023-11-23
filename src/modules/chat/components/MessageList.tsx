import { type Message } from "@prisma/client";
import clsx from "clsx";

type Props = {
  messages: Message[];
  currentUserId: string;
};

export const MessageList = async ({ messages, currentUserId }: Props) => {
  return (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
          className={clsx(
            "chat",
            currentUserId === message.senderId ? "chat-end" : "chat-start"
          )}
        >
          <div className="chat-bubble">{message.content}</div>
        </div>
      ))}
    </>
  );
};
