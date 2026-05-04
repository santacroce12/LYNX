import type { ReactNode } from "react";
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
        <main className="relative overflow-x-hidden pt-[76px] md:pt-28">{children}</main>
      </MotionProvider>
    </>
  );
}
