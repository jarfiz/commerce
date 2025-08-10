"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "@/lib/hooks";
import { selectTotalPrice } from "@/lib/features/cart/cartSlice";
import usdToIdr from "@/lib/moneyConverter";

// schema
const formSchema = z.object({
  firstName: z.string().min(4, {
    error: "First name must be at least 4 characters",
  }),
  lastName: z.string().min(4, {
    error: "Last name must be at least 4 characters",
  }),
  email: z.email(),
  phone: z.string(),
});

const CheckoutForm = () => {
  const totalPrice = useAppSelector(selectTotalPrice);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const value = { ...values, price: usdToIdr(totalPrice) };
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-fit rounded-md p-4 outline">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {/* first name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter your first name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* last name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter your last name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter your email address</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Enter your phone number</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-2 w-full">
            Pay now
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
