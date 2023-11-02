import db from "@/lib/db";
import { SizeColumn } from "./Components/columns";
import { format } from "date-fns";
import SizesClient from "./Components/SizesClient";

export default async function SizesPage({
  params,
}: {
  params: {
    storeid: string;
  };
}) {
  const allSizes = await db.size.findMany({
    where: {
      storeId: params.storeid,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = allSizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
}
