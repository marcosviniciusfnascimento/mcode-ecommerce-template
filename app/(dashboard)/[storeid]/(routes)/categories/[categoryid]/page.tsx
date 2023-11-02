import BillboardForm from "@/components/form/BillboardForm";
import CategoryForm from "@/components/form/CategoryForm";
import db from "@/lib/db";

export default async function CategoryPage({
  params,
}: {
  params: { storeid: string; categoryid: string };
}) {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryid,
    },
  });

  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeid,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
}
