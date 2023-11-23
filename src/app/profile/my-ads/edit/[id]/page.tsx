import { CreateAdForm } from "@/modules/profile/components/CreateAdForm";
import { prisma } from "@/server/db";
import { notFound } from "next/navigation";

const ProfileEditPage = async ({ params }: { params: { id: string } }) => {
  const ad = await prisma.ad.findFirst({
    where: { id: params.id },
    include: { contactData: true },
  });

  if (!ad) {
    notFound();
  }

  const categories = await prisma.category.findMany();
  const conditions = await prisma.itemCondition.findMany();

  return (
    <>
      <div className="mb-8 flex justify-between gap-2">
        <h1 className="text-4xl font-bold">Edytuj ogłoszenie</h1>
      </div>

      <CreateAdForm
        adId={params.id}
        categories={categories}
        conditions={conditions}
        initialValues={{
          name: ad.title,
          description: ad.description,
          negotiable: ad.negotiable,
          price: ad.price,
          categoryId: ad.categoryId,
          conditionId: ad.conditionId,
          firstName: ad.contactData?.firstName ?? "",
          lastName: ad.contactData?.lastName ?? "",
          email: ad.contactData?.email ?? "",
          phoneNumber: ad.contactData?.phone ?? "",
        }}
      />
    </>
  );
};

export default ProfileEditPage;
