"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeid}`,
      label: "Visão Geral",
      active: pathname === `/${params.storeid}`,
    },
    {
      href: `/${params.storeid}/billboards`,
      label: "Painéis",
      active: pathname === `/${params.storeid}/billboards`,
    },
    {
      href: `/${params.storeid}/categories`,
      label: "Categorias",
      active: pathname === `/${params.storeid}/categories`,
    },
    {
      href: `/${params.storeid}/sizes`,
      label: "Tamanhos",
      active: pathname === `/${params.storeid}/sizes`,
    },
    {
      href: `/${params.storeid}/colors`,
      label: "Cores",
      active: pathname === `/${params.storeid}/colors`,
    },
    {
      href: `/${params.storeid}/products`,
      label: "Produtos",
      active: pathname === `/${params.storeid}/products`,
    },
    {
      href: `/${params.storeid}/orders`,
      label: "Pedidos",
      active: pathname === `/${params.storeid}/orders`,
    },
    {
      href: `/${params.storeid}/settings`,
      label: "Configurações",
      active: pathname === `/${params.storeid}/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
