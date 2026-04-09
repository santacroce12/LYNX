"use client";

import FooterContent from "@/components/layout/FooterContent";

export default function Footer() {
  return (
    <footer className="relative mt-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_12%_16%,rgba(255,122,26,0.12),transparent_24%),radial-gradient(circle_at_86%_10%,rgba(125,168,255,0.1),transparent_22%)]" />

      <div className="relative overflow-hidden border-y border-white/8 bg-[linear-gradient(180deg,rgba(10,17,31,0.96)_0%,rgba(7,13,24,0.96)_100%)]">
        <div className="panel-decoration pointer-events-none absolute inset-0 panel-grid opacity-15" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mx-auto w-full max-w-[1320px] px-5 py-8 sm:px-6 md:px-8 md:py-10">
          <FooterContent />
        </div>
      </div>
    </footer>
  );
}
