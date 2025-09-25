"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, ShoppingCart } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { selectCart, selectTotalQuantity } from "@/lib/features/cart/cartSlice";
import { useAppSelector } from "@/lib/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Navbar = () => {
  const router = useRouter();

  const cart = useAppSelector(selectCart);
  const quantity = useAppSelector(selectTotalQuantity);

  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 bg-white shadow-md">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold text-gray-700">
          Commerce
        </Link>
        <div className="flex items-center space-x-4">
          {user && (
            <HoverCard>
              <HoverCardTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.image as string} />
                  <AvatarFallback>
                    {user?.name
                      .split(" ")
                      .map((v, i) => v.slice(0, i + 1))
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent
                className="flex cursor-pointer items-center gap-x-2.5 text-red-500"
                onClick={handleSignOut}
              >
                <LogOut />
                Logout
              </HoverCardContent>
            </HoverCard>
          )}

          <Button
            size="icon"
            variant="outline"
            className="relative cursor-pointer"
            onClick={() => router.push("/checkout")}
          >
            <ShoppingCart className="relative z-10" />

            {cart.length === 0 ? null : (
              <span className="absolute -top-1 -right-2 flex size-4.5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {quantity}
              </span>
            )}
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
