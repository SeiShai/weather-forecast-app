import React from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1f0c3a]">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
