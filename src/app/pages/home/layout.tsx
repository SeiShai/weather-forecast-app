import React from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#320a3a] via-[#520181] to-[#27012d]">
      <Sidebar />
      <main className="flex-1 w-full lg:w-auto">{children}</main>
    </div>
  );
}
