"use client";

import { Plus } from "lucide-react";
import Heading from "../../../../../../components/Heading";
import { Button } from "../../../../../../components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { ColorColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/dataTable";
import ApiList from "@/components/ui/apiList";
import { Separator } from "@/components/ui/separator";

interface ColorsClientProps {
  data: ColorColumn[];
}
export default function ColorsClient({ data }: ColorsClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Cores (${data.length})`}
          description="Gerencia as cores para sua loja"
        />
        <Button onClick={() => router.push(`/${params.storeid}/colors/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Novo
        </Button>
      </div>
      <Separator />
      <DataTable searchKey={"name"} columns={columns} data={data} />
      <Heading title="API" description="Chamadas API para as Cores" />
      <Separator />
      <ApiList entityIdName="colorid" entityName="colors" />
    </>
  );
}
