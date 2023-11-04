import ProductForm from "@/components/form/ProductForm";
import db from "@/lib/db";

export default async function ProductPage({
  params,
}: {
  params: { storeid: string; productid: string };
}) {
  const product = await db.product.findUnique({
    where: {
      id: params.productid,
    },
    include: {
      images: true,
    },
  });

  const categories = await db.category.findMany({
    where: {
      storeId: params.storeid,
    },
  });

  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeid,
    },
  });

  const colors = await db.color.findMany({
    where: {
      storeId: params.storeid,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          categories={categories}
          colors={colors}
          sizes={sizes}
        />
      </div>
    </div>
  );
}
