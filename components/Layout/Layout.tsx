"use client";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/register") {
    return (
      <main className="dark flex min-h-screen flex-col items-center justify-center p-24 bg-slate-200 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900">
        {children}
      </main>
    );
  }
  return (
    <main className="dark flex min-h-screen flex-col items-center justify-start bg-slate-200 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900">
      <Navbar />
      {children}
    </main>
  );
}
