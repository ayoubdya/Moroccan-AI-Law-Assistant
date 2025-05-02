import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Morocco Legal Assistant - AI-Powered Legal Advice",
  description: "Get accurate, instant, and confidential legal guidance from our intelligent chatbot designed specifically for Moroccan law.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
