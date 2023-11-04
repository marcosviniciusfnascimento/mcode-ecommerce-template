import db from "@/lib/db";
import { ProductColumn } from "./Components/columns";
import { format } from "date-fns";
import { currencyFormatter } from "@/lib/utils";
import ProductClient from "./Components/ProductClient";

export default async function ProductsPage({
  params,
}: {
  params: {
    storeid: string;
  };
}) {
  const allProducts = await db.product.findMany({
    where: {
      storeId: params.storeid,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = allProducts.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: currencyFormatter.format(Number(item.price)),
    category: item.category.name,
    size: item.size.value,
    color: item.color.value,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
}
