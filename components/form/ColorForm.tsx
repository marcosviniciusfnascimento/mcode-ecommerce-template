"use client";

import { Billboard, Color, Size } from "@prisma/client";
import Heading from "../Heading";
import { Button as ShadcnButton } from "../ui/button";
import { Trash } from "lucide-react";
import { Separator } from "../ui/separator";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button, Input } from "@nextui-org/react";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "../modals/alertModal";
import { useOrigin } from "@/hooks/useOrigin";
import ImageUpload from "../ui/ImageUpload";

const FormSchema = z.object({
  name: z.string().min(1),
  value: z
    .string()
    .min(1)
    .regex(/^#/, { message: "A cor deve ser um código Hex válido" }),
});

type ColorFormValues = z.infer<typeof FormSchema>;

interface ColorFormProps {
  initialData: Color | null;
}

export default function ColorForm(props: ColorFormProps) {
  const { initialData } = props;
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const origin = useOrigin();

  const title = initialData ? "Editar Cor" : "Criar Cor";
  const description = initialData ? "Editar uma Cor" : "Criar uma Cor";
  const toastMessage = initialData ? "Cor alterada" : "Cor criada";
  const action = initialData ? "Salvar alterações" : "Criar";

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: ColorFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeid}/colors/${params.colorid}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeid}/colors`, data);
      }
      router.refresh();
      toast.success(toastMessage);
      router.push(`/${params.storeid}/colors`);
    } catch (error) {
      toast.error("Algo deu errado!");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeid}/colors/${params.colorid}`);
      router.refresh();
      router.push(`/${params.storeid}/colors`);
      toast.success("Cor excluída");
    } catch (error) {
      toast.error(
        "Garanta que excluiu todos os produtos que utilizam essa cor primeiro!"
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <ShadcnButton
            disabled={loading}
            variant={"destructive"}
            size="sm"
            onClick={() => setOpen(true)}
          >
            {" "}
            <Trash className="text-white h-4 w-4" />
          </ShadcnButton>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nome da cor..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Valor da cor..."
                        {...field}
                      />
                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            variant="solid"
            disabled={loading}
            isLoading={loading}
            className="dark rounded-lg"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
}

// 03:57:00
