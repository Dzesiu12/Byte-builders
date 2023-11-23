"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { registerUser } from "../actions";
import { registerUserSchema } from "../schemas";
import Link from "next/link";

type FormFields = z.infer<typeof registerUserSchema>;

export const RegisterForm = () => {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<FormFields>({
    resolver: zodResolver(registerUserSchema),
  });

  const submitHandler = async (data: FormFields) => {
    await registerUser(data);
    router.push("/auth/login");
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex w-full max-w-md flex-col gap-2 rounded-lg border p-8"
    >
      <h1 className="mb-4 text-2xl font-bold">Rejestracja</h1>

      <div className="grid grid-cols-2 gap-2">
        <label className="flex flex-col gap-1 text-sm">
          <span>Imię</span>
          <input
            {...register("firstName")}
            disabled={formState.isSubmitting}
            type="text"
            placeholder="Jan"
            className={clsx(
              "input-bordered input w-full",
              formState.errors.firstName && "input-error"
            )}
          />

          {formState.errors.firstName && (
            <p className="text-xs text-error">
              {formState.errors.firstName.message}
            </p>
          )}
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span>Nazwisko</span>
          <input
            {...register("lastName")}
            disabled={formState.isSubmitting}
            type="text"
            placeholder="Kowalski"
            className={clsx(
              "input-bordered input w-full",
              formState.errors.lastName && "input-error"
            )}
          />

          {formState.errors.lastName && (
            <p className="text-xs text-error">
              {formState.errors.lastName.message}
            </p>
          )}
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        <span>Adres e-mail</span>
        <input
          {...register("email")}
          disabled={formState.isSubmitting}
          type="text"
          placeholder="jan.kowalski@gmail.com"
          className={clsx(
            "input-bordered input w-full",
            formState.errors.email && "input-error"
          )}
        />

        {formState.errors.email && (
          <p className="text-xs text-error">{formState.errors.email.message}</p>
        )}
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span>Hasło</span>
        <input
          {...register("password")}
          disabled={formState.isSubmitting}
          type="password"
          placeholder="********"
          className={clsx(
            "input-bordered input w-full",
            formState.errors.password && "input-error"
          )}
        />

        {formState.errors.password && (
          <p className="text-xs text-error">
            {formState.errors.password.message}
          </p>
        )}
      </label>

      <button
        type="submit"
        disabled={formState.isSubmitting}
        className="btn-primary btn"
      >
        {formState.isSubmitting && (
          <span className="loading loading-spinner"></span>
        )}
        Utwórz konto
      </button>

      <div className="divider">Lub</div>

      <Link
        className="mx-auto  text-blue-500 hover:underline"
        href="/auth/login"
      >
        Zaloguj się
      </Link>
    </form>
  );
};
