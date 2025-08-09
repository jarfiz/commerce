"use client";

import Products from "@/components/products";
import { fetchProducts, selectProducts } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hookss";
import { useEffect } from "react";

const Home = () => {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="mt-20 mb-20 space-y-20">
      <h1 className="text-center text-4xl font-bold">Our Products</h1>
      <div className="container mx-auto grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {products.map((product, index) => (
          <Products key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
