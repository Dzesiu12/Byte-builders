import { getAppServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import dayjs from "dayjs";
import Link from "next/link";
import { redirect } from "next/navigation";

const ProfileAdsPage = async () => {
  const session = await getAppServerAuthSession();
  if (!session) {
    redirect("/auth/login");
  }

  const ads = await prisma.ad.findMany({
    where: { userId: session.user.id },
  });

  return (
    <>
      <div className="mb-4 flex justify-between gap-2">
        <h1 className="text-4xl font-bold">Moje ogłoszenia ({ads.length})</h1>

        <Link className="btn-primary btn" href="/profile/my-ads/create">
          Dodaj ogłoszenie
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {ads.map((ad) => (
          <Link
            key={ad.id}
            href={`/profile/my-ads/edit/${ad.id}`}
            className="rounded-xl border p-4 transition hover:bg-gray-100"
          >
            <h2>{ad.title}</h2>
            <p>Dodano: {dayjs(ad.createdAt).format("DD.MM.YYYY")}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProfileAdsPage;
