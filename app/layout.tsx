import type { Metadata } from "next";
import "./globals.css";
import { Urbanist } from "next/font/google"

const poppins = Urbanist({
  subsets: ['latin'],
  weight: ['500']
})

export const metadata: Metadata = {
  title: "ATS | Applicant Tracking System",
  description: "Applicant Tracking System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
