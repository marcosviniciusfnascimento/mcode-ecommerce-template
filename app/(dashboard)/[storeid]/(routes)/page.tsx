import { getGraphRevenue } from "@/actions/getGraphRevenue";
import { getSalesCount } from "@/actions/getSalesCount";
import { getStockCount } from "@/actions/getStockCount";
import { getTotalRevenue } from "@/actions/getTotalRevenue";
import Heading from "@/components/Heading";
import Overview from "@/components/Overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { cn, currencyFormatter } from "@/lib/utils";
import { DollarSign, CreditCard, PackageIcon } from "lucide-react";

interface DashboardPageProps {
  params: { storeid: string };
}
export default async function DashboardPage(props: DashboardPageProps) {
  const { params } = props;

  const totalRevenue = await getTotalRevenue(params.storeid);
  const salesCount = await getSalesCount(params.storeid);
  const stockCount = await getStockCount(params.storeid);
  const graphRevenue = await getGraphRevenue(params.storeid);

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Visão geral da loja" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex flex-row items-center justify-between space-y-0 pb-2">
                Total Recebido
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currencyFormatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex flex-row items-center justify-between space-y-0 pb-2">
                Vendas
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex flex-row items-center justify-between space-y-0 pb-2">
                Produtos em Estoque
                <PackageIcon className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
