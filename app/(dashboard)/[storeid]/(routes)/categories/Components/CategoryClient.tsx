"use client";

import { Plus } from "lucide-react";
import Heading from "../../../../../../components/Heading";
import { Button } from "../../../../../../components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";
import { CategoriesColumns, columns } from "./columns";
import { DataTable } from "@/components/ui/dataTable";
import ApiList from "@/components/ui/apiList";
import { Separator } from "@/components/ui/separator";

interface CategoryClientProps {
  data: CategoriesColumns[];
}
export default function CategoryClient({ data }: CategoryClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categorias (${data.length})`}
          description="Gerencia as categorias da sua loja"
        />
        <Button
          onClick={() => router.push(`/${params.storeid}/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Novo
        </Button>
      </div>
      <Separator />
      <DataTable searchKey={"name"} columns={columns} data={data} />
      <Heading title="API" description="Chamadas API para as categorias" />
      <Separator />
      <ApiList entityIdName="categoryid" entityName="categories" />
    </>
  );
}
