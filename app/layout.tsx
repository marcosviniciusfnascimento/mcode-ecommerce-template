import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import ModalsProviders from "./Providers/ModalsProviders";
import ToasterProvider from "./Providers/ToastProviders";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "m/code | E-Commerce Template",
  description: "E-Commerce with dashboard + store + CMS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <Providers>
          <ModalsProviders />
          <ToasterProvider />
          {children}
        </Providers>
      </body>
    </html>
  );
}
