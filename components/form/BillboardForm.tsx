"use client";

import { Billboard } from "@prisma/client";
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
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof FormSchema>;

interface BillboardFormProps {
  initialData: Billboard | null;
}

export default function BillboardForm(props: BillboardFormProps) {
  const { initialData } = props;
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const origin = useOrigin();

  const title = initialData ? "Editar Painel" : "Criar Painel";
  const description = initialData ? "Editar um Painel" : "Criar um Painel";
  const toastMessage = initialData ? "Painel alterado" : "Painel Criado";
  const action = initialData ? "Salvar alterações" : "Criar";

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeid}/billboards/${params.billboardid}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeid}/billboards`, data);
      }
      router.refresh();
      toast.success(toastMessage);
      router.push(`/${params.storeid}/billboards`);
    } catch (error) {
      toast.error("Algo deu errado!");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeid}/billboards/${params.billboardid}`
      );
      router.refresh();
      router.push(`/${params.storeid}/billboards`);
      toast.success("Painel excluído");
    } catch (error) {
      toast.error(
        "Garanta que excluiu todos as categorias que utilizam esse painel primeiro!"
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
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rótulo</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Rótulo do painel..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem de Fundo</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
