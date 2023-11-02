"use client";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import db from "@/lib/db";
import { cn } from "@/lib/utils";
import { CommandDialog } from "cmdk";
import { Command, StoreIcon, CheckIcon, PlusCircle } from "lucide-react";

interface DashboardPageProps {
  params: { storeId: string };
}
export default function DashboardPage(props: DashboardPageProps) {
  return (
    <div className="text-black">
      {/* <CommandDialog open={true}>
        <Command>
          <CommandList id="1" itemID="1">
            <CommandInput
              placeholder="Procure uma loja..."
              className="text-sm"
            />
            <CommandEmpty>Nenhuma loja encontrada.</CommandEmpty>
            <CommandGroup heading="Lojas">
              <CommandItem className="text-sm">
                <StoreIcon className="mr-2 h-4 w-4" />
                Item do COmmand
                <CheckIcon className={cn("ml-auto h-4 w-4")} />
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem className="flex">
                <PlusCircle className="mr-2 h-5 w-5" />
                Criar Loja
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog> */}
    </div>
  );
}
