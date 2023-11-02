import BillboardForm from "@/components/form/BillboardForm";
import db from "@/lib/db";

export default async function BillboardPage({
  params,
}: {
  params: { billboardid: string };
}) {
  const billboard = await db.billboard.findUnique({
    where: {
      id: params.billboardid,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
}
