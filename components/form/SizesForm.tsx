"use client";

import { Billboard, Size } from "@prisma/client";
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
  value: z.string().min(1),
});

type SizeFormValues = z.infer<typeof FormSchema>;

interface SizeFormProps {
  initialData: Size | null;
}

export default function SizeForm(props: SizeFormProps) {
  const { initialData } = props;
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const origin = useOrigin();

  const title = initialData ? "Editar Tamanho" : "Criar Tamanho";
  const description = initialData ? "Editar um Tamanho" : "Criar um Tamanho";
  const toastMessage = initialData ? "Tamanho alterado" : "Tamanho criado";
  const action = initialData ? "Salvar alterações" : "Criar";

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: SizeFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeid}/sizes/${params.sizeid}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeid}/sizes`, data);
      }
      router.refresh();
      toast.success(toastMessage);
      router.push(`/${params.storeid}/sizes`);
    } catch (error) {
      toast.error("Algo deu errado!");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeid}/sizes/${params.sizeid}`);
      router.refresh();
      router.push(`/${params.storeid}/sizes`);
      toast.success("Tamanho excluído");
    } catch (error) {
      toast.error(
        "Garanta que excluiu todos os produtos que utilizam esse tamanho primeiro!"
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
                      placeholder="Nome do tamanho..."
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
                    <Input
                      disabled={loading}
                      placeholder="Valor do tamanho..."
                      {...field}
                    />
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
