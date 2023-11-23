import { Avatar } from "@/modules/profile/components/Avatar";
import { prisma } from "@/server/db";
import { notFound } from "next/navigation";
import { RiEyeLine, RiMessage2Fill, RiPhoneFill } from "react-icons/ri";
import { Carousel } from "@/modules/listing/components/Carousel";
import dayjs from "dayjs";
import { StartChatButton } from "@/modules/listing/components/StartChatButton";
import { getAppServerAuthSession } from "@/server/auth";
import Link from "next/link";
import { Navbar } from "@/modules/layout/Navbar";

const currencyFormatter = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
});

const AdDetailsPage = async ({ params }: { params: { id: string } }) => {
  const session = await getAppServerAuthSession();
  const ad = await prisma.ad.findFirst({
    where: { id: params.id },
    include: {
      condition: true,
      contactData: true,
      user: true,
      categoty: true,
    },
  });

  if (!ad) {
    return notFound();
  }

  await prisma.ad.update({
    where: { id: params.id },
    data: { views: ad.views + 1 },
  });

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <div className="breadcrumbs mb-10 text-sm">
          <ul>
            <li>
              <Link href="/">Ogłoszenia</Link>
            </li>
            <li>
              <p>{ad.title}</p>
            </li>
          </ul>
        </div>

        {session && session.user.id === ad.userId && (
          <div className="alert alert-info sticky top-10 z-10 mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Przeglądasz swoje ogłoszenie.</span>
            <div>
              <Link
                href={`/profile/my-ads/edit/${ad.id}`}
                className="btn-secondary btn-sm btn"
              >
                Przejdź do edycji
              </Link>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-8 xl:flex-row xl:items-start">
          <div className="flex-1 overflow-hidden rounded-xl border p-8">
            <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row">
              <div>
                <h1 className="mb-1 text-2xl font-bold">{ad.title}</h1>
                <p>Dodano: {dayjs(ad.createdAt).format("DD.MM.YYYY")}</p>
              </div>

              <div className="flex w-full flex-row flex-wrap items-center gap-2 md:w-auto md:flex-col md:items-end">
                <div className="flex flex-wrap gap-2">
                  <p className="flex items-center whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-medium">
                    <RiEyeLine className="mr-2" />
                    {ad.views}
                  </p>

                  <p className="whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-medium">
                    {ad.condition.name}
                  </p>

                  <p className="whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-medium">
                    {ad.negotiable ? "Do negocjacji" : "Nie do negocjacji"}
                  </p>
                </div>

                <p className="ml-auto text-lg font-medium">
                  {currencyFormatter.format(ad.price / 100)}
                </p>
              </div>
            </div>

            <Carousel
              className="mb-4 aspect-[4/3] w-full"
              images={[
                "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1684&q=80",
                "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
                "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1684&q=80",
              ]}
            />

            <h2 className="mb-2 text-lg font-bold">Opis produktu</h2>
            <p>{ad.description}</p>
          </div>

          <div className="flex w-full flex-col gap-8 md:flex-row xl:max-w-sm xl:flex-col">
            <div className="flex-1 rounded-xl border p-4 md:p-8">
              <div className="mb-4 flex gap-4">
                <Avatar seed={ad.id} />

                <div>
                  <p className="text-2xl font-bold">
                    {ad.contactData?.firstName} {ad.contactData?.lastName}
                  </p>
                  <p>
                    Na platrofmie od:{" "}
                    {dayjs(ad.user?.createdAt).format("DD.MM.YYYY")}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {session?.user ? (
                  <StartChatButton adId={ad.id} />
                ) : (
                  <Link className="btn-primary btn flex-1" href="/auth/login">
                    <RiMessage2Fill className="mr-2 h-4 w-4" />
                    Wyślij wiadomość
                  </Link>
                )}

                <a
                  href={`tel:${ad.contactData?.phone}`}
                  className="btn-secondary btn flex-1"
                >
                  <RiPhoneFill className="mr-2 h-4 w-4" />
                  Zadzwoń
                </a>
              </div>
            </div>

            <div className="flex-1 rounded-xl border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d131510.49834082442!2d20.945440588385477!3d52.23174282000229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc669a869f01%3A0x72f0be2a88ead3fc!2sWarszawa!5e0!3m2!1spl!2spl!4v1688580837862!5m2!1spl!2spl"
                className="aspect-video h-full w-full rounded-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* <div className="breadcrumbs text-sm">
    <ul>
      <li>
        <a>Home</a>
      </li>
      <li>
        <a>Documents</a>
      </li>
      <li>Add Document</li>
    </ul>
  </div>

  <Carousel
    images={[
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    ]}
  />

  <h1 className="mb-8 text-4xl font-bold">{ad.title}</h1>
  <div>Data dodania ogłoszenia: 01.01.2023 (dni temu)</div>
  <div>Opis: {ad.description}</div>
  <div>Cena do negocjacji: {ad.negotiable ? "Tak" : "Nie"}</div>
  <div>Stan: {ad.condition.name}</div> */}
      </div>
    </>
  );
};

export default AdDetailsPage;
