import BillboardClient from "@/app/(dashboard)/[storeid]/(routes)/billboards/Components/BillboardClient";
import db from "@/lib/db";
import { BillboardColumns } from "./Components/columns";
import { format } from "date-fns";

export default async function BillboardsPage({
  params,
}: {
  params: {
    storeid: string;
  };
}) {
  const allBillboards = await db.billboard.findMany({
    where: {
      storeId: params.storeid,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumns[] = allBillboards.map(
    (billboard) => ({
      id: billboard.id,
      createdAt: format(billboard.createdAt, "dd/MM/yyyy"),
      label: billboard.label,
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
}
