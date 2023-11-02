"use client";

import { Store } from "@prisma/client";
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
import { ApiAlert } from "../ui/apiAlert";
import { useOrigin } from "@/hooks/useOrigin";

interface SettingsFormProps {
  initialData: Store;
}

const FormSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof FormSchema>;

export default function SettingsForm(props: SettingsFormProps) {
  const { initialData } = props;
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const origin = useOrigin();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);

      await axios.patch(`/api/stores/${params.storeid}`, data);
      router.refresh();
      toast.success("Loja atualizada!");
    } catch (error) {
      toast.error("Algo deu errado!");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeid}`);
      router.refresh();
      router.push("/");
      toast.success("Loja excluída");
    } catch (error) {
      toast.error(
        "Garanta que excluiu todos os produtos e categorias primeiro!"
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
        <Heading
          title="Configurações"
          description="Gerenciar configurações da loja"
        />
        <ShadcnButton
          disabled={loading}
          variant={"destructive"}
          size="sm"
          onClick={() => setOpen(true)}
        >
          {" "}
          <Trash className="text-white h-4 w-4" />
        </ShadcnButton>
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
                      placeholder="Nome da loja..."
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
            Salvar
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeid}`}
        variant="public"
      />
    </>
  );
}
