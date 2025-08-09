"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  decreaseQuantity,
  increaseQuantity,
  removeAllProduct,
  removeSingleProduct,
  selectCart,
  selectTotalPrice,
  selectTotalQuantity,
} from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hookss";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const router = useRouter();

  const cart = useAppSelector(selectCart);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const totalPrice = useAppSelector(selectTotalPrice);

  const dispatch = useAppDispatch();

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-medium">Your cart</h1>
      <div className="mt-10 grid grid-cols-[1fr_440px] gap-12">
        <div className="flex flex-col space-y-2 p-4">
          {/*  */}
          {cart.map((item, index) => (
            <div key={index} className="flex outline">
              <Image src={item.thumbnail} alt="images" width={80} height={80} />
              <div className="flex flex-1 items-center justify-between px-6">
                <div>
                  <h1>{item.title}</h1>
                  <p className="text-xl font-medium">${item.price}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      +
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      -
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => dispatch(removeSingleProduct(item.id))}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {totalQuantity === 0 ? (
            <div className="mt-20 grid place-items-center space-y-4">
              <h1>Your cart is empty. Please add items to proceed.</h1>
              <Button onClick={() => router.push("/")}>Add Product</Button>
            </div>
          ) : (
            <div className="mt-6 flex items-center justify-between">
              <div className="w-1/4">
                <div className="flex w-full items-center justify-between">
                  <Label className="text-lg">Total Quantity: </Label>
                  <span>{totalQuantity}</span>
                </div>

                <div className="flex w-full items-center justify-between">
                  <Label className="text-lg">Total Price: </Label>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <Button onClick={() => dispatch(removeAllProduct())}>
                Remove All Product
              </Button>
            </div>
          )}
        </div>

        {/* form */}
        <div className="h-fit space-y-4 px-10 py-5 outline">
          <div className="space-y-1.5">
            <Label htmlFor="first-name text-sm">First Name</Label>
            <Input placeholder="First Name" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="first-name text-sm">Last Name</Label>
            <Input placeholder="Last Name" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="first-name text-sm">Email</Label>
            <Input placeholder="Email" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="first-name text-sm">Phone</Label>
            <Input placeholder="Phone" />
          </div>
          <Button className="w-full">Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
