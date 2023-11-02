"use client";

import { useStoreModal } from "@/hooks/useStoreModal";
import ModalDefault from "@/components/modals/modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useState } from "react";
import axios from "axios";
import { Button, Input } from "@nextui-org/react";

const FormSchema = z.object({
  name: z.string().min(1),
});

export default function StoreModal() {
  const storeModal = useStoreModal();
  const [loading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/stores", values);
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error("Algo deu errado!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalDefault
      title="Criar nova loja"
      description="Adicione uma noval loja para gerenciar categorias e produtos"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name={"name"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="E-Commerce"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  onClick={storeModal.onClose}
                  className="rounded-lg"
                >
                  Cancelar
                </Button>
                <Button
                  isLoading={loading}
                  className="dark rounded-lg"
                  type="submit"
                >
                  Continuar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </ModalDefault>
  );
}
