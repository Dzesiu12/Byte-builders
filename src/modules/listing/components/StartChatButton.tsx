"use client";

import { useState } from "react";
import { RiMessage2Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { createChat } from "../actions";

type Props = {
  adId: string;
};

export const StartChatButton = ({ adId }: Props) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleCreateChat = async () => {
    if (isPending) return;
    setIsPending(true);

    try {
      const chatId = await createChat(adId);
      if (!chatId) return;
      router.push(`/chat/${chatId}`);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      disabled={isPending}
      onClick={handleCreateChat}
      className="btn-primary btn flex-1"
    >
      {isPending ? (
        <span className="loading loading-ring loading-md"></span>
      ) : (
        <>
          <RiMessage2Fill className="mr-2 h-4 w-4" />
          Wyślij wiadomość
        </>
      )}
    </button>
  );
};
