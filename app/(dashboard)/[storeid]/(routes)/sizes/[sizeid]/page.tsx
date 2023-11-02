import SizeForm from "@/components/form/SizeFOrm";
import db from "@/lib/db";

export default async function SizePage({
  params,
}: {
  params: { sizeid: string };
}) {
  const size = await db.size.findUnique({
    where: {
      id: params.sizeid,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
}
