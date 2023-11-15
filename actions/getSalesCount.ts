import db from "@/lib/db";

export const getSalesCount = async (storeId: string) => {
  const salesCountes = await db.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });
  return salesCountes;
};
