import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import StoreProvider from "@/app/StoreProvider";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Commerce",
  description: "Simple commerce application build with next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <StoreProvider>
          <Navbar />
          <main>{children}</main>
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
