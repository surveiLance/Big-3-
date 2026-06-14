import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { SplashScreen } from "@/components/SplashScreen";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Big 3",
  description: "A visual dashboard comparing Federer, Nadal, and Djokovic.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030404] text-white">
        <SplashScreen />
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1536px] flex-col overflow-x-clip px-3 py-3 sm:px-9 sm:py-6">
          <Suspense fallback={<div className="h-16" />}>
            <Navbar />
          </Suspense>
          {children}
        </div>
      </body>
    </html>
  );
}
