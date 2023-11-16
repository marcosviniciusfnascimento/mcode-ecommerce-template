"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import logo from "../../app/assets/Mcode.tsx.svg";
import { Button } from "@nextui-org/react";
import { useState } from "react";

const FormSchema = z
  .object({
    name: z.string().min(1, "Name is Required").max(100),
    email: z.string().min(1, "Email is Required").email("Email Invalid"),
    password: z
      .string()
      .min(1, "Password is Required")
      .min(8, "Password must have more than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is Required!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: createUser } = useMutation({
    mutationFn: async (values: z.infer<typeof FormSchema>) => {
      setLoading(true);
      const response = await axios.post("/api/user/", values);

      if (response.status === 201) {
        router.push("/login");
      } else {
        setLoading(false);
        console.log("Failed to create new user");
      }
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    createUser(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-5 bg-slate-300 backdrop-blur-3xl rounded-lg flex flex-col items-center justify-center"
      >
        <Image src={logo} alt="logo" width={140} height={80} />
        <div className="grid grid-cols-1 w-80 gap-5 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-800">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type here..."
                    {...field}
                    className="bg-white text-zinc-800"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-800">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type here..."
                    {...field}
                    className="bg-white text-zinc-800"
                  />
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
                <FormLabel className="text-zinc-800">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type here..."
                    {...field}
                    type="password"
                    className="bg-white text-zinc-800"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-800">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type here..."
                    {...field}
                    type="password"
                    className="bg-white text-zinc-800"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-purple-900 text-slate-200"
            isLoading={loading}
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
