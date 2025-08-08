import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function page() {
  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-medium">Your cart</h1>
      <div className="mt-10 grid grid-cols-[1fr_440px] gap-12">
        <div className="flex flex-col space-y-2 p-4">
          <div className="flex outline">
            <Image
              src="https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp"
              alt="images"
              width={80}
              height={80}
            />
            <div className="flex flex-1 items-center justify-between px-6">
              <div>
                <h1>Product 1</h1>
                <p className="text-xl font-medium">$99</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="space-x-2">
                  <Button size="sm" variant="outline">
                    +
                  </Button>
                  <span>1</span>
                  <Button size="sm" variant="outline">
                    -
                  </Button>
                </div>
                <Button size="sm">Remove</Button>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p>Total</p>
            <Button>Remove All Product</Button>
          </div>
        </div>

        {/* form */}
        <div className="space-y-4 px-10 py-5 outline">
          <div>
            <label htmlFor="first-name text-sm">First Name</label>
            <Input placeholder="First Name" />
          </div>
          <div>
            <label htmlFor="first-name text-sm">Last Name</label>
            <Input placeholder="Last Name" />
          </div>
          <div>
            <label htmlFor="first-name text-sm">Email</label>
            <Input placeholder="Email" />
          </div>
          <div>
            <label htmlFor="first-name text-sm">Phone</label>
            <Input placeholder="Phone" />
          </div>
          <Button className="w-full">Checkout</Button>
        </div>
      </div>
    </div>
  );
}
