"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../app/assets/Mcode.tsx.svg";
import { useState } from "react";
import { Button } from "@nextui-org/react";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    const credentials = {
      email: values.email,
      password: values.password,
      redirect: false,
    };
    const signInData = await signIn("credentials", credentials);

    if (signInData?.error) {
      console.log(signInData.error);
    } else {
      setLoading(false);
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <h5 className="text-slate-200 text-lg font-extrabold py-4 max-md:text-md text-center">
        {" "}
        Welcome to my E-commerce Template{" "}
      </h5>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-80 rounded-lg bg-white/70 backdrop-blur-3xl p-5 items-center justify-center flex flex-col"
      >
        <Image src={logo} alt="logo" width={140} height={80} />
        <div className="space-y-2 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
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
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          isLoading={loading}
          className="w-full mt-6 bg-primary text-white"
          type="submit"
        >
          Sign in
        </Button>
      </form>
      <div className="mx-auto my-4 flex items-center justify-evenly w-80 before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        If you don&apos;t have an account, please&nbsp;
      </p>
      <Link className="hover:underline mt-3 " href="/register">
        Sign up
      </Link>
    </Form>
  );
}
