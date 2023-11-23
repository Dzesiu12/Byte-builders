"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { type z } from "zod";
import clsx from "clsx";
import { loginSchema } from "../schemas";
import Link from "next/link";

type FormFields = z.infer<typeof loginSchema>;

export const Loginform = () => {
  const { register, handleSubmit, formState } = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
  });

  const submitHandler = async (data: FormFields) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex w-full max-w-md  flex-col gap-2 rounded-lg border p-8"
    >
      <h1 className="mb-4 text-2xl font-bold">Logowanie</h1>

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
        disabled={formState.isSubmitting}
        type="submit"
        className="btn-primary btn"
      >
        {formState.isSubmitting && (
          <span className="loading loading-spinner"></span>
        )}
        Zaloguj się
      </button>

      <div className="divider">Lub</div>

      <Link
        className="mx-auto  text-blue-500 hover:underline"
        href="/auth/register"
      >
        Utwórz konto
      </Link>
    </form>
  );
};
