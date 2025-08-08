import { getProducts } from "@/actions/products";
import Products from "@/components/products";

const Home = async () => {
  const products = await getProducts();

  return (
    <div className="mt-20 mb-20 space-y-20">
      <h1 className="text-center text-4xl font-bold">Our Products</h1>
      <div className="container mx-auto grid grid-cols-4 gap-6 px-4">
        {products.map((product) => (
          <Products key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
