import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

const Products = ({ product }: { product: Product }) => {
  return (
    <div
      key={product.id}
      className="flex flex-col rounded-md p-4 outline outline-gray-200"
    >
      <Image
        src={product.thumbnail}
        width={200}
        height={200}
        alt={`${product.title} image`}
        className="mx-auto w-full rounded-md outline outline-gray-100"
      />
      <div className="flex flex-1 flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h1 className="mt-2 text-xl leading-[1.1] font-medium">
            {product.title}
          </h1>
          <p className="font-bold text-green-500">$ {product.price}</p>
        </div>
        <Button className="flex items-center">
          <ShoppingCart size={24} />
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default Products;
