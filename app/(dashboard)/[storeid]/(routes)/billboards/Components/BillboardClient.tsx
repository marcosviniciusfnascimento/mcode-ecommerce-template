"use client";

import { Plus } from "lucide-react";
import Heading from "../../../../../../components/Heading";
import { Button } from "../../../../../../components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";
import { BillboardColumns, columns } from "./columns";
import { DataTable } from "@/components/ui/dataTable";
import ApiList from "@/components/ui/apiList";
import { Separator } from "@/components/ui/separator";
import { CategoriesColumns } from "../../categories/Components/columns";

interface BillboardClientProps {
  data: BillboardColumns[];
}
export default function BillboardClient({ data }: BillboardClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Painéis (${data.length})`}
          description="Gerencia os painéis para sua loja"
        />
        <Button
          onClick={() => router.push(`/${params.storeid}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Novo
        </Button>
      </div>
      <Separator />
      <DataTable searchKey={"label"} columns={columns} data={data} />
      <Heading title="API" description="Chamadas API para os Painéis" />
      <Separator />
      <ApiList entityIdName="billboardid" entityName="billboards" />
    </>
  );
}
