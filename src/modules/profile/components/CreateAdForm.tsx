"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ItemCondition,
  type Category,
  type Parameter,
} from "@prisma/client";
import { useForm } from "react-hook-form";
import { createAdFormSchema } from "../schemas";
import { type z } from "zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { createAd, getCategoryParameters, updateAd } from "../actions";
import { useState } from "react";

type FormFields = z.infer<typeof createAdFormSchema>;

type Props = {
  categories: Category[];
  conditions: ItemCondition[];
  adId?: string;
  initialValues?: FormFields;
};

export const CreateAdForm = ({
  categories,
  conditions,
  adId,
  initialValues,
}: Props) => {
  const isEdit = !!adId;
  const router = useRouter();

  const [parameters, setParameters] = useState<Parameter[]>([]);

  const { register, handleSubmit, formState, watch, setValue, getValues } =
    useForm<FormFields>({
      resolver: zodResolver(createAdFormSchema),
      defaultValues: initialValues,
    });

  const submitHandler = async (data: FormFields) => {
    if (formState.isSubmitting) return;

    if (isEdit) {
      await updateAd(adId, data);
    } else {
      await createAd(data);
    }

    router.push("/profile/my-ads");
  };

  const handleCategoryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryId = e.target.value;
    setValue("categoryId", categoryId, { shouldValidate: true });
    const categoryParams = await getCategoryParameters(categoryId);
    setParameters(categoryParams ?? []);
  };

  const handleParamChange = (paramId: string, value: string) => {
    const currentParams = getValues("params") ?? {};
    currentParams[paramId] = value;
    setValue("params", currentParams);
  };

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row md:items-start">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="grid max-w-xl flex-1 flex-shrink-0 gap-8 rounded-xl border p-4"
      >
        <div className="grid gap-4">
          <h2 className="text-2xl font-bold">Informacje o produkcie</h2>

          <label className="flex flex-col gap-1">
            <span>Nazwa</span>
            <input
              {...register("name")}
              disabled={formState.isSubmitting}
              type="text"
              placeholder="Type here"
              className={clsx(
                "input input-bordered",
                formState.errors.name && "input-error"
              )}
            />

            {formState.errors.name && (
              <p className="text-sm text-error">
                {formState.errors.name.message}
              </p>
            )}
          </label>

          <label className="flex flex-col gap-1">
            <span>Kategoria</span>
            <select
              value={watch("categoryId")}
              onChange={handleCategoryChange}
              disabled={formState.isSubmitting}
              className={clsx(
                "select select-bordered",
                formState.errors.categoryId && "select-error"
              )}
              defaultValue=""
            >
              <option disabled value="">
                Wybierz kategorię
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {formState.errors.categoryId && (
              <p className="text-sm text-error">
                {formState.errors.categoryId.message}
              </p>
            )}
          </label>

          <label className="flex flex-col gap-1">
            <span>Opis produktu</span>
            <textarea
              {...register("description")}
              disabled={formState.isSubmitting}
              className={clsx(
                "textarea textarea-bordered",
                formState.errors.description && "textarea-error"
              )}
              placeholder="Type here"
            />

            {formState.errors.description && (
              <p className="text-sm text-error">
                {formState.errors.description.message}
              </p>
            )}
          </label>

          <label className="flex flex-col gap-1">
            <span>Stan produktu</span>
            <select
              {...register("conditionId")}
              disabled={formState.isSubmitting}
              className={clsx(
                "select select-bordered",
                formState.errors.conditionId && "select-error"
              )}
              defaultValue=""
            >
              <option disabled value="">
                Wybierz z listy
              </option>
              {conditions.map((condition) => (
                <option key={condition.id} value={condition.id}>
                  {condition.name}
                </option>
              ))}
            </select>

            {formState.errors.conditionId && (
              <p className="text-sm text-error">
                {formState.errors.conditionId.message}
              </p>
            )}
          </label>

          <label className="flex flex-col gap-1">
            <span>Cena</span>
            <input
              {...register("price")}
              disabled={formState.isSubmitting}
              type="text"
              placeholder="Type here"
              className={clsx(
                "input input-bordered",
                formState.errors.price && "input-error"
              )}
            />

            {formState.errors.price && (
              <p className="text-sm text-error">
                {formState.errors.price.message}
              </p>
            )}
          </label>

          <label className="flex flex-col gap-1 self-start">
            <span>Cena podlega negocjacji</span>
            <input
              {...register("negotiable")}
              disabled={formState.isSubmitting}
              type="checkbox"
              className="toggle"
            />

            {formState.errors.negotiable && (
              <p className="text-sm text-error">
                {formState.errors.negotiable.message}
              </p>
            )}
          </label>
        </div>

        <div className="grid gap-4">
          <h2 className="text-2xl font-bold">Dane kontaktowe</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span>Imię</span>
              <input
                {...register("firstName")}
                disabled={formState.isSubmitting}
                type="text"
                placeholder="Type here"
                className={clsx(
                  "input input-bordered",
                  formState.errors.firstName && "input-error"
                )}
              />

              {formState.errors.firstName && (
                <p className="text-sm text-error">
                  {formState.errors.firstName.message}
                </p>
              )}
            </label>

            <label className="flex flex-col gap-1">
              <span>Nazwisko</span>
              <input
                {...register("lastName")}
                disabled={formState.isSubmitting}
                type="text"
                placeholder="Type here"
                className={clsx(
                  "input input-bordered",
                  formState.errors.lastName && "input-error"
                )}
              />

              {formState.errors.lastName && (
                <p className="text-sm text-error">
                  {formState.errors.lastName.message}
                </p>
              )}
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span>Adres email</span>
              <input
                {...register("email")}
                disabled={formState.isSubmitting}
                type="email"
                placeholder="Type here"
                className={clsx(
                  "input input-bordered",
                  formState.errors.email && "input-error"
                )}
              />

              {formState.errors.email && (
                <p className="text-sm text-error">
                  {formState.errors.email.message}
                </p>
              )}
            </label>

            <label className="flex flex-col gap-1">
              <span>Numer telefonu</span>
              <input
                {...register("phoneNumber")}
                disabled={formState.isSubmitting}
                type="tel"
                placeholder="Type here"
                className={clsx(
                  "input input-bordered",
                  formState.errors.phoneNumber && "input-error"
                )}
              />

              {formState.errors.phoneNumber && (
                <p className="text-sm text-error">
                  {formState.errors.phoneNumber.message}
                </p>
              )}
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? (
            <span className="loading loading-ring loading-md"></span>
          ) : isEdit ? (
            "Zapisz"
          ) : (
            "Dodaj ogłoszenie"
          )}
        </button>
      </form>

      <div className="flex flex-1 flex-shrink-0 flex-col gap-4 rounded-xl border p-4">
        <h2 className="text-2xl font-bold">Parametry kategorii</h2>

        {parameters.length === 0 && <p>Wybierz kategorię</p>}

        <div className="grid gap-4">
          {parameters.map((param) => (
            <div key={param.id}>
              <p className="mb-1 font-bold">{param.name}</p>

              <label className="flex flex-col gap-1">
                <select
                  onChange={(e) => handleParamChange(param.id, e.target.value)}
                  disabled={formState.isSubmitting}
                  className={clsx(
                    "select select-bordered",
                    formState.errors.categoryId && "select-error"
                  )}
                >
                  <option disabled value="">
                    Wybierz kategorię
                  </option>
                  {param.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                {formState.errors.categoryId && (
                  <p className="text-sm text-error">
                    {formState.errors.categoryId.message}
                  </p>
                )}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
