"use client";

import { Header } from "@/components/back_office/client/dashboard/header";
import { Navigation } from "@/components/back_office/client/dashboard/navigation";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-7xl mx-auto my-4 px-6 min-h-screen">
      <Header /> 
      <Navigation /> 
      {children}
    </div>
  );
}
