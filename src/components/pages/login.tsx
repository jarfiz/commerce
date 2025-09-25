"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.email({
    pattern: z.regexes.rfc5322Email,
    error: "Please enter a valid email address.",
  }),
  password: z
    .string({ error: "Please enter a password." })
    .min(8, "Password must be at least 8 characters."),
});

const Register = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: (ctx) => {
            router.push("/");
            toast.success("Login successfully");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  const googleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log(data);
  };

  return (
    <Form {...form}>
      <h1 className="mt-20 text-center text-2xl font-medium">
        Login to your account
      </h1>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-4 py-10"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email address." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-500">
            Register
          </Link>
        </p>
        <div className="mt-10 space-y-3">
          <Button type="submit" className="w-full cursor-pointer">
            Login
          </Button>

          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <Button
            className="w-full cursor-pointer"
            variant="outline"
            onClick={(e) => googleLogin(e)}
          >
            <Image
              src="google.svg"
              width={50}
              height={50}
              alt="google"
              className="size-4"
            />
            Google
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default Register;
