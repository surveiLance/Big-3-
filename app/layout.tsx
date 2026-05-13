import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RouteTransition } from "@/components/RouteTransition";
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
      <body className="min-h-full flex flex-col">
        <RouteTransition />
        {children}
      </body>
    </html>
  );
}
