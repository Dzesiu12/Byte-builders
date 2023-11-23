import { CreateAdForm } from "@/modules/profile/components/CreateAdForm";
import { prisma } from "@/server/db";

const ProfileCreateAdPage = async () => {
  const categories = await prisma.category.findMany();
  const conditions = await prisma.itemCondition.findMany();

  return (
    <>
      <div className="mb-8 flex justify-between gap-2">
        <h1 className="text-4xl font-bold">Dodaj ogłoszenie</h1>
      </div>

      <CreateAdForm categories={categories} conditions={conditions} />
    </>
  );
};

export default ProfileCreateAdPage;
