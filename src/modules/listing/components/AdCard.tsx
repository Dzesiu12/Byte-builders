import { prisma } from "@/server/db";
import { type Ad } from "@prisma/client";
import Link from "next/link";

type Props = {
  ad: Ad;
};

const currencyFormatter = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
});

export const AdCard = async ({ ad }: Props) => {
  const condition = await prisma.itemCondition.findFirst({
    where: { id: ad.conditionId },
  });

  return (
    <Link
      href={`/${ad.id}`}
      className="card bg-base-100 shadow transition hover:shadow-xl"
    >
      <img
        className="aspect-video rounded-t-xl object-cover"
        src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
      />

      <div className="card-body p-4">
        <div className="flex justify-between gap-2">
          <h2 className="card-title">{ad.title}</h2>
          <span className="font-bold">
            {currencyFormatter.format(ad.price / 100)}
          </span>
        </div>

        <div className="flex flex-col items-start">
          <p>
            Podglega negocjacji:{" "}
            <span className="font-bold">{ad.negotiable ? "Tak" : "Nie"}</span>
          </p>

          <p>
            Stan: <span className="font-bold">{condition?.name}</span>
          </p>
        </div>
      </div>
    </Link>
  );

  // return (
  // <Link
  //   href={`/${ad.id}`}
  //   className="rounded-xl border p-4 transition hover:bg-gray-50 xl:p-8"
  // >
  //   <div className="mb-2 flex justify-between">
  //     <p className="text-xl font-bold">{ad.title}</p>
  //   </div>

  //   <p>
  //     Stan: <span className="font-bold">{condition?.name}</span>
  //   </p>

  //   <p>
  //     Cena:{" "}
  //     <span className="font-bold">
  //       {currencyFormatter.format(ad.price / 100)}
  //     </span>
  //   </p>

  //   <p>
  //     Podglega negocjacji:{" "}
  //     <span className="font-bold">{ad.negotiable ? "Tak" : "Nie"}</span>
  //   </p>
  // </Link>
  // );
};
