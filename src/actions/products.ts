"use server";

import { Products } from "@/types/product";

export const getProducts = async () => {
  const res = await fetch("https://dummyjson.com/products", {
    cache: "reload",
  });
  const data: Products = await res.json();
  return data.products;
};
