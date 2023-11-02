import BillboardClient from "@/app/(dashboard)/[storeid]/(routes)/billboards/Components/BillboardClient";
import db from "@/lib/db";
import { CategoriesColumns } from "./Components/columns";
import { format } from "date-fns";
import CategoryClient from "./Components/CategoryClient";

export default async function CategoriesPage({
  params,
}: {
  params: {
    storeid: string;
  };
}) {
  const allCategories = await db.category.findMany({
    where: {
      storeId: params.storeid,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoriesColumns[] = allCategories.map(
    (item) => ({
      id: item.id,
      createdAt: format(item.createdAt, "dd/MM/yyyy"),
      name: item.name,
      billboardLabel: item.billboard.label,
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
}
