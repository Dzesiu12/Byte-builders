import { Navbar } from "@/modules/layout/Navbar";
import { AdCard } from "@/modules/listing/components/AdCard";
import { SearchInput } from "@/modules/listing/components/SearchInput";
import { prisma } from "@/server/db";

const ListingPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search = (searchParams?.search as string) ?? "";
  const ads = await prisma.ad.findMany();
  const filteredAds = ads.filter(
    (ad) =>
      ad.title.toLowerCase().includes(search.toLowerCase()) ||
      ad.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <div className="mb-2 flex flex-wrap justify-between gap-4 md:mb-8">
          <h1 className=" text-4xl font-bold ">Lista ogłoszeń</h1>
          <SearchInput />
        </div>

        {filteredAds.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        ) : (
          <div className="py-40">
            <p className="texcxt-gray-400 text-center text-xl">
              Nie znaleziono ogłoszeń.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ListingPage;
