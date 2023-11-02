import db from "@/lib/db";
import { ColorColumn } from "./Components/columns";
import { format } from "date-fns";
import ColorsClient from "./Components/ColorsClient";

export default async function ColorsPage({
  params,
}: {
  params: {
    storeid: string;
  };
}) {
  const allColors = await db.color.findMany({
    where: {
      storeId: params.storeid,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = allColors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  );
}
