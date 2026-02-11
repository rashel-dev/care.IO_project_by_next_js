import React from "react";
import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
