import type { Metadata } from "next";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/providers/MotionProvider";
import "./globals.css";

const hanken = localFont({
  src: [
    { path: "./fonts/hanken-grotesk-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/hanken-grotesk-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/hanken-grotesk-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-hanken",
  display: "swap",
});

const bodoni = localFont({
  src: [
    { path: "./fonts/bodoni-moda-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/bodoni-moda-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-bodoni",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Socle", template: "%s · Socle" },
  description: "Votre intérieur, comme dans un magazine.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr-BE" className={`${hanken.variable} ${bodoni.variable} h-full antialiased`}>
      <body className="min-h-full bg-ground font-sans text-fg">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
