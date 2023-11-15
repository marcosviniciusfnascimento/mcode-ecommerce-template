import db from "@/lib/db";

interface GraphData {
  name: string;
  total: number;
}
export const getGraphRevenue = async (storeId: string) => {
  const paidOrders = await db.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();
    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.product.price.toNumber();
    }
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  const graphData: GraphData[] = [
    {
      name: "Jan",
      total: 0,
    },
    {
      name: "Feb",
      total: 2500,
    },
    {
      name: "Mar",
      total: 3500,
    },
    {
      name: "Apr",
      total: 0,
    },
    {
      name: "May",
      total: 0,
    },
    {
      name: "Jun",
      total: 0,
    },
    {
      name: "Jul",
      total: 1599,
    },
    {
      name: "Aug",
      total: 2500,
    },
    {
      name: "Sep",
      total: 2800,
    },
    {
      name: "Oct",
      total: 3200,
    },
    {
      name: "Nov",
      total: 1200,
    },
    {
      name: "Dec",
      total: 0,
    },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};
