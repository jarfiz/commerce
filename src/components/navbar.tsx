import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="shadow-md">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold text-gray-700">
          Commerce
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/checkout">Checkout</Link>
          <Button size="icon" variant="outline" className="relative">
            <ShoppingCart className="relative z-10" />
            <span className="absolute -top-1 -right-2 flex size-4.5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              99
            </span>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
