"use client";
import {
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import ThemeSwitcher from "./ThemeSwitcher";

export default function UserInfo() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          src="https://api.dicebear.com/7.x/adventurer/svg?seed=Misty"
          className="cursor-pointer"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem className="flex flex-row space-x-2 items-center justify-center">
          <ThemeSwitcher />
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger flex flex-row space-x-2 items-center justify-center"
          color="danger"
          onClick={() => signOut()}
          endContent={<LogOutIcon className="ml-auto h-4 w-4" />}
        >
          <h6>Sair</h6>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
