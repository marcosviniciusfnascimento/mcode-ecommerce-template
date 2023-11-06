"use client";

import { Billboard, Category } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const FormSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof FormSchema>;

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[] | null;
}

export default function CategoryForm(props: CategoryFormProps) {
  const { initialData, billboards } = props;
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const origin = useOrigin();

  const title = initialData ? "Editar Categoria" : "Criar Categoria";
  const description = initialData
    ? "Editar uma Categoria"
    : "Criar uma Categoria";
  const toastMessage = initialData ? "Categoria alterada" : "Categoria Criada";
  const action = initialData ? "Salvar alterações" : "Criar";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeid}/categories/${params.categoryid}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeid}/categories`, data);
      }
      router.refresh();
      toast.success(toastMessage);
      router.push(`/${params.storeid}/categories`);
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
        `/api/${params.storeid}/categories/${params.categoryid}`
      );
      router.refresh();
      router.push(`/${params.storeid}/categories`);
      toast.success("Categoria excluída");
    } catch (error) {
      toast.error(
        "Garanta que excluiu todos os produtos que utilizam essa categoria primeiro!"
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
                      placeholder="Nome da categoria..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Painel</FormLabel>
                  <FormControl>
                    <Select
                      disabled={loading}
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="text-start w-48">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Selecione um painel"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {billboards?.map((billboard) => (
                          <SelectItem key={billboard.id} value={billboard.id}>
                            {billboard.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
            className="rounded-md bg-primary text-white dark:text-black font-semibold"
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
