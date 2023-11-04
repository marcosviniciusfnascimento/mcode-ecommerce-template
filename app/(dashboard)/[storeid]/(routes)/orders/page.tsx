import BillboardClient from "@/app/(dashboard)/[storeid]/(routes)/billboards/Components/BillboardClient";
import db from "@/lib/db";
import { OrderColumn } from "./Components/columns";
import { format } from "date-fns";
import { currencyFormatter } from "@/lib/utils";
import OrderClient from "./Components/OrderClient";

export default async function OrdersPage({
  params,
}: {
  params: {
    storeid: string;
  };
}) {
  const allOrders = await db.order.findMany({
    where: {
      storeId: params.storeid,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = allOrders.map((item) => ({
    id: item.id,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: currencyFormatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
}
