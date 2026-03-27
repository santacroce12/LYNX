import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Sora } from "next/font/google";
import Script from "next/script";
import "@/styles/globals.css";
import { site } from "@/content/site";

const GTM_ID = "GTM-WCTH78XQ";

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
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
