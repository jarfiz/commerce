import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CheckoutForm = () => {
  return (
    <form className="h-fit space-y-4 px-10 py-5 outline">
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
    </form>
  );
};

export default CheckoutForm;
