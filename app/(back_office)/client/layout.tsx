"use client";

import Header from "@/components/back_office/client/dashboard/header";
import Navigation from "@/components/back_office/client/dashboard/navigation";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto py-10 px-6 min-h-screen">
      <Header /> <Navigation /> {children}
    </div>
  );
}
