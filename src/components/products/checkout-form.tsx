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
import { useRouter } from "next/navigation";

// this is get in after the payment is done / completed
interface MidtransResult {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
}
declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options?: {
          onSuccess?: (res: MidtransResult) => void;
          onPending?: (res: MidtransResult) => void;
          onError?: (res: MidtransResult) => void;
          onClose?: (res: MidtransResult) => void;
        },
      ) => void;
    };
  }
}

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
  const router = useRouter();

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
      console.log(data.success);
      console.log(data.transaction_token);
      console.log(data.redirect_url);

      if (data.success && data.transaction_token) {
        if (!window.snap) {
          const script = document.createElement("script");
          script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
          script.setAttribute("data-client-key", process.env.CLIENT_KEY || "");
          document.head.appendChild(script);

          script.onload = () => {
            window.snap.pay(data.transaction_token, {
              onSuccess: () => {
                router.push("/payment/success");
              },
              onPending: () => {
                router.push("/payment/pending");
              },
              onError: () => {
                router.push("/payment/fail");
              },
              onClose: () => {
                console.log("Pop up closed");
              },
            });
          };
        }
      } else {
        window.snap.pay(data.transaction_token, {
          onSuccess: () => {
            router.push("/payment/success");
          },
          onPending: () => {
            router.push("/payment/pending");
          },
          onError: () => {
            router.push("/payment/fail");
          },
          onClose: () => {
            console.log("Pop up closed");
          },
        });
      }
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
