import { type Category } from "@prisma/client";
import { AddCategoryDialog } from "./AddCategoryDialog";
import { RemoveCategoryDialog } from "./RemoveCategoryDialog";

type CategoryWithChildren = Category & {
  children: CategoryWithChildren[];
};

type Props = {
  category: CategoryWithChildren;
  level: number;
};

export const CategoryTreeItem = ({ category, level }: Props) => {
  return (
    <div
      className="flex flex-col gap-2 rounded-lg border p-4"
      style={{ marginLeft: `${level * 16}px` }}
    >
      <div className="flex justify-between">
        <p className="font-bold">{category.name}</p>

        <div className="flex gap-2">
          <RemoveCategoryDialog
            category={category}
            trigger={<button className="btn btn-sm">Usuń kategorię</button>}
          />

          <AddCategoryDialog
            parentId={category.id}
            trigger={<button className="btn btn-sm">Dodaj podkategorię</button>}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {category.children.map((child) => (
          <CategoryTreeItem key={child.id} level={level + 1} category={child} />
        ))}
      </div>
    </div>
  );
};
