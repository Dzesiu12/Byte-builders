"use client";

import { type ReactNode, useId, useRef, type ElementRef } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type Category } from "@prisma/client";
import { removeCategorySchema } from "../schemas";
import { removeCategory } from "../actions";

type FormFields = z.infer<typeof removeCategorySchema>;

type Props = {
  trigger: ReactNode;
  category: Category;
};

export const RemoveCategoryDialog = ({ trigger, category }: Props) => {
  const router = useRouter();

  const dialogRef = useRef<ElementRef<"dialog">>(null);
  const dialogId = useId();

  const { formState, handleSubmit } = useForm<FormFields>({
    resolver: zodResolver(removeCategorySchema),
    defaultValues: { id: category.id },
  });

  const handleDialogOpen = () => {
    dialogRef.current?.showModal();
  };

  const handleDialogClose = () => {
    dialogRef.current?.close();
  };

  const submitHandler = async () => {
    await removeCategory({ id: category.id });
    router.refresh();
    handleDialogClose();
  };

  return (
    <>
      <div onClick={handleDialogOpen}>{trigger}</div>
      <dialog id={dialogId} ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="mb-4 text-lg font-bold">
            Usuń kategorię {category.name}
          </h3>

          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="btn"
                disabled={formState.isSubmitting}
                onClick={handleDialogClose}
              >
                Anuluj
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={formState.isSubmitting}
              >
                {formState.isSubmitting && (
                  <span className="loading loading-spinner loading-xs"></span>
                )}
                Usuń
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};
