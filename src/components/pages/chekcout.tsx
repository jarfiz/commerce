"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Checkout = () => {
  const router = useRouter();

  const cart = useAppSelector(selectCart);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const totalPrice = useAppSelector(selectTotalPrice);

  const dispatch = useAppDispatch();

  const handleRemoveAllProduct = () => {
    dispatch(removeAllProduct());
    toast.success("All product deleted successfully");
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-medium">Your cart</h1>
      <div className="mt-10 grid gap-12 sm:grid-cols-1 md:grid-cols-[1fr_440px]">
        <div className="flex flex-col space-y-2 p-4">
          {/*  */}
          {cart.map((item, index) => (
            <div key={index} className="flex p-4 outline">
              <Image src={item.thumbnail} alt="images" width={80} height={80} />
              <div className="flex flex-1 flex-col space-y-4 px-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1>{item.title}</h1>
                  <p className="font-medium md:text-base lg:text-xl">
                    ${item.price}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
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
                    variant="outline"
                    className="text-red-500"
                    onClick={() => {
                      dispatch(removeSingleProduct(item.id));
                      toast.success("Product deleted");
                    }}
                  >
                    <Trash />
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
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Remove All Product</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      all products from your cart.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleRemoveAllProduct}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
