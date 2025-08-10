import CheckoutForm from "@/components/checkout-form";
import ProductList from "@/components/product-list";

const Checkout = () => {
  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-medium">Your cart</h1>
      <div className="mt-10 grid gap-12 sm:grid-cols-1 md:grid-cols-[1fr_440px]">
        <ProductList />
        <CheckoutForm />
      </div>
    </div>
  );
};

export default Checkout;
