"use client";

import { Plus } from "lucide-react";
import Heading from "../../../../../../components/Heading";
import { Button } from "../../../../../../components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/dataTable";
import ApiList from "@/components/ui/apiList";
import { Separator } from "@/components/ui/separator";
import { CategoriesColumns } from "../../categories/Components/columns";

interface ProductClientProps {
  data: ProductColumn[];
}
export default function ProductClient({ data }: ProductClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Produtos (${data.length})`}
          description="Gerencia os produtos para sua loja"
        />
        <Button onClick={() => router.push(`/${params.storeid}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Novo
        </Button>
      </div>
      <Separator />
      <DataTable searchKey={"name"} columns={columns} data={data} />
      <Heading title="API" description="Chamadas API para os Produtos" />
      <Separator />
      <ApiList entityIdName="productid" entityName="products" />
    </>
  );
}
