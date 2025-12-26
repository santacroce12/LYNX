import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Sora } from "next/font/google";
import BotLynx from "@/components/marketing/BotLynx";
import "@/styles/globals.css";
import { site } from "@/content/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${sora.variable} ${spaceGrotesk.variable}`}
      data-theme="dark"
    >
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased">
        {children}
        <BotLynx />
      </body>
    </html>
  );
}
