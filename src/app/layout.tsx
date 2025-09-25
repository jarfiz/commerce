import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import StoreProvider from "@/app/StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";
import "./globals.css";

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
