import Footer from "@/components/front_office/Footer";
import Navbar from "@/components/front_office/Navbar";
import React from "react";
import NextTopLoader from "nextjs-toploader";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4BB3DA] to-[#548293]">
      <NextTopLoader height={3} color="#2563ebe6" />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
