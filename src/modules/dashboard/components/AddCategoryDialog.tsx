"use client";

import { type ReactNode, useId, useRef, type ElementRef } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { addCategoryFormSchema } from "../schemas";
import { addCategory } from "../actions";

type FormFields = z.infer<typeof addCategoryFormSchema>;

type Props = {
  trigger: ReactNode;
  parentId?: string;
};

export const AddCategoryDialog = ({ trigger, parentId }: Props) => {
  const router = useRouter();

  const dialogRef = useRef<ElementRef<"dialog">>(null);
  const dialogId = useId();

  const { register, formState, handleSubmit, reset } = useForm<FormFields>({
    resolver: zodResolver(addCategoryFormSchema),
  });

  const handleDialogOpen = () => {
    dialogRef.current?.showModal();
  };

  const handleDialogClose = () => {
    dialogRef.current?.close();
  };

  const submitHandler = async (formData: FormFields) => {
    await addCategory({
      ...formData,
      parentId: parentId ?? null,
    });

    router.refresh();
    handleDialogClose();
    reset({ name: "" });
  };

  return (
    <>
      <div onClick={handleDialogOpen}>{trigger}</div>
      <dialog id={dialogId} ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="mb-4 text-lg font-bold">Dodaj kategorię</h3>

          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(submitHandler)}
          >
            <input
              type="text"
              placeholder="Nazwa kategorii"
              disabled={formState.isSubmitting}
              className="input input-bordered"
              {...register("name")}
            />

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
                Dodaj
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};
