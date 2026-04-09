"use client";

import FooterContent from "@/components/layout/FooterContent";

export default function Footer() {
  return (
    <footer className="relative mt-14">
      <div className="pointer-events-none absolute inset-x-0 top-12 h-56 bg-[radial-gradient(circle_at_12%_18%,rgba(255,122,26,0.12),transparent_22%),radial-gradient(circle_at_86%_10%,rgba(125,168,255,0.12),transparent_20%)]" />

      <div className="mx-auto w-full max-w-6xl px-5 pb-8 sm:px-6">
        <div className="panel-shell overflow-hidden rounded-[2rem] px-5 py-6 md:px-8 md:py-8">
          <div className="panel-decoration pointer-events-none absolute inset-0 panel-grid opacity-25" />
          <FooterContent />
        </div>
      </div>
    </footer>
  );
}
