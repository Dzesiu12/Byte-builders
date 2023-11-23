"use client";

import { type z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiSendPlane2Line } from "react-icons/ri";
import clsx from "clsx";
import { sendMessageFormSchema } from "../schemas";
import { sendMessage } from "../actions";

type FormFields = z.infer<typeof sendMessageFormSchema>;

type Props = {
  chatId: string;
  onSubmit: () => void;
};

export const MessageForm = ({ chatId, onSubmit }: Props) => {
  const { register, handleSubmit, formState, reset } = useForm<FormFields>({
    resolver: zodResolver(sendMessageFormSchema),
  });

  const submitHandler = async (data: FormFields) => {
    if (formState.isSubmitting) return;
    await sendMessage({
      message: data.message,
      chatId: chatId,
    });

    reset();
    onSubmit();
  };

  const isSubmitDisabled = formState.isSubmitting || !formState.isValid;
  const isInputDisabled = formState.isSubmitting;

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex gap-2">
      <input
        type="text"
        {...register("message")}
        placeholder="Twoja wiadomość ..."
        disabled={isInputDisabled}
        className={clsx(
          "input-bordered input flex-1",
          isInputDisabled && "input-disabled"
        )}
      />

      <button
        disabled={isSubmitDisabled}
        className={clsx("btn w-32", isSubmitDisabled && "btn-disabled")}
      >
        Wyślij
        {formState.isSubmitting ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <RiSendPlane2Line />
        )}
      </button>
    </form>
  );
};
