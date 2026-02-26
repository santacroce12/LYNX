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
    icon: [{ url: "/favicon.ico?v=2", type: "image/x-icon" }],
    shortcut: "/favicon.ico?v=2",
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
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed de LYNX"
          href="/feed.xml"
        />
      </head>
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased">
        {children}
        <BotLynx />
      </body>
    </html>
  );
}
