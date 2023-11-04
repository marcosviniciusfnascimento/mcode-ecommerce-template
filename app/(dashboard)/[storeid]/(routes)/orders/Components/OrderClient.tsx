"use client";

import Heading from "../../../../../../components/Heading";
import { useParams, useRouter } from "next/navigation";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/dataTable";
import { Separator } from "@/components/ui/separator";

interface OrderClientProps {
  data: OrderColumn[];
}
export default function OrderClient({ data }: OrderClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <Heading
        title={`Pedidos (${data.length})`}
        description="Gerencia os pedidos para sua loja"
      />
      <Separator />
      <DataTable searchKey={"label"} columns={columns} data={data} />
    </>
  );
}
