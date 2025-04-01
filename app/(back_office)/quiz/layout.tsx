"use client";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto py-10 px-6 min-h-screen">{children}</div>
  );
}
