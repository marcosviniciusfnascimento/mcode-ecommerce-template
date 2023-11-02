"use client";

import { Plus } from "lucide-react";
import Heading from "../../../../../../components/Heading";
import { Button } from "../../../../../../components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";
import { SizeColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/dataTable";
import ApiList from "@/components/ui/apiList";
import { Separator } from "@/components/ui/separator";
import { CategoriesColumns } from "../../categories/Components/columns";

interface SizesClientProps {
  data: SizeColumn[];
}
export default function SizesClient({ data }: SizesClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Tamanhos (${data.length})`}
          description="Gerencia os tamanhos para sua loja"
        />
        <Button onClick={() => router.push(`/${params.storeid}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Novo
        </Button>
      </div>
      <Separator />
      <DataTable searchKey={"name"} columns={columns} data={data} />
      <Heading title="API" description="Chamadas API para os Tamanhos" />
      <Separator />
      <ApiList entityIdName="sizeid" entityName="sizes" />
    </>
  );
}
