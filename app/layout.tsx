import "./globals.css";
import localFont from "next/font/local";
import { cn } from "@/utils/cn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lens",
  description: "Search on Reddit with ease.",
  openGraph: {
    type: "website",
    title: "Lens",
    description: "Search on Reddit with ease.",
    siteName: "Lens",
    url: "https://lens.valencassa.dev",
    images: [
      {
        url: "https://i.imgur.com/H55Isz9.png",
        width: 1920,
        height: 960,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lens",
    description: "Search on Reddit with ease.",
    creator: "@devcassa",
    images: ["https://i.imgur.com/H55Isz9.png"],
  },
};

const satoshiFont = localFont({
  src: "../public/fonts/Satoshi-Variable.ttf",
  variable: "--satoshi-font",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${satoshiFont.variable} font-sans`}>
        <main className={cn("max-w-[1160px] mx-auto px-4 xl:px-0 pt-14 pb-8")}>
          {children}
        </main>
      </body>
    </html>
  );
}
