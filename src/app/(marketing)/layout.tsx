import type { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MotionProvider from "@/components/motion/MotionProvider";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      <MotionProvider>
        <main className="pt-20">{children}</main>
      </MotionProvider>
      <Footer />
    </>
  );
}
