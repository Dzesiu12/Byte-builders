import { AddCategoryDialog } from "@/modules/dashboard/components/AddCategoryDialog";
import { CategoryTreeItem } from "@/modules/dashboard/components/CategoryTreeItem";
import { prisma } from "@/server/db";
import { type Category } from "@prisma/client";

type CategoryWithChildren = Category & {
  children: CategoryWithChildren[];
};

const buildCategoryTree = async (categories: Category[]) => {
  const idMap = new Map<string, CategoryWithChildren>();
  for (const category of categories) {
    idMap.set(category.id, { ...category, children: [] });
  }

  const rootCategories: CategoryWithChildren[] = [];

  categories.forEach((category) => {
    const cat = idMap.get(category.id);
    if (!cat) return;

    if (!cat.parentId) {
      return rootCategories.push(cat);
    }

    const parent = idMap.get(cat.parentId);
    if (parent) {
      parent.children?.push(cat);
    }
  });

  return rootCategories;
};

const DashboardPage = async () => {
  const categories = await prisma.category.findMany();
  const categoryTree = await buildCategoryTree(categories);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-2 flex items-center justify-between md:mb-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>

        <AddCategoryDialog
          trigger={
            <button className="btn btn-sm">Dodaj kategorię główną</button>
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        {categoryTree.map((category) => (
          <CategoryTreeItem key={category.id} level={0} category={category} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
