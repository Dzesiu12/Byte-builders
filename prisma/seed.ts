import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createConditions = async () => {
  const newCondition = await prisma.itemCondition.create({
    data: { name: "Nowy" },
  });

  const usedCondition = await prisma.itemCondition.create({
    data: { name: "Używany" },
  });

  const damagedCondition = await prisma.itemCondition.create({
    data: { name: "Uszkodzony" },
  });

  return [newCondition, usedCondition, damagedCondition];
};

const createProcessors = async () => {
  return prisma.category.create({
    data: {
      name: "Procesory",
      parameters: {
        createMany: {
          data: [
            {
              name: "Producent",
              options: ["Intel", "AMD"],
            },
            {
              name: "Socket",
              options: [
                "AM4",
                "LGA 1151",
                "LGA 1200",
                "LGA 2066",
                "TR4",
                "sTRX4",
              ],
            },
            {
              name: "Seria procesora",
              options: [
                "Intel Core i3",
                "Intel Core i5",
                "Intel Core i7",
                "Intel Core i9",
                "Intel Xeon",
                "AMD Ryzen 3",
                "AMD Ryzen 5",
                "AMD Ryzen 7",
                "AMD Ryzen 9",
                "AMD Ryzen Threadripper",
              ],
            },
            {
              name: "Zintegr. układ graficzny",
              options: ["Tak", "Nie"],
            },
            {
              name: "Liczba rdzeni",
              options: [
                "1",
                "2",
                "4",
                "6",
                "8",
                "10",
                "12",
                "16",
                "18",
                "24",
                "32",
                "64",
              ],
            },
          ],
        },
      },
    },
  });
};

const createCases = async () => {
  return prisma.category.create({
    data: {
      name: "Obudowy",
      parameters: {
        createMany: {
          data: [
            {
              name: "Producent",
              options: ["SilentiumPC", "Fractal Design", "NZXT", "Corsair"],
            },
            {
              name: "Format",
              options: ["ATX", "Micro ATX", "Mini ITX"],
            },
            {
              name: "Okno w bocznej ściance",
              options: ["Tak", "Nie"],
            },
            {
              name: "Liczba wentylatorów",
              options: ["1", "2", "3", "4", "5", "6", "7", "8"],
            },
          ],
        },
      },
    },
  });
};

const seed = async () => {
  await prisma.contactData.deleteMany();
  await prisma.ad.deleteMany();
  await prisma.itemCondition.deleteMany();
  await prisma.category.deleteMany();

  await createConditions();
  await createCases();
  await createProcessors();
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
