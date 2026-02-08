import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { VitaLifeProvider } from "@/contexts/VitaLifeContext";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vazirmatn = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/vazirmatn/files/vazirmatn-arabic-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "VitaLife | مربی هوشمند زندگی",
  description:
    "مربی هوشمند زندگی که هر روز فقط چند قدم ساده و قابل انجام پیشنهاد می‌ده",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f8f9fa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazirmatn.variable} ${geistMono.variable} font-sans min-h-screen antialiased`}
      >
        <VitaLifeProvider>{children}</VitaLifeProvider>
      </body>
    </html>
  );
}
