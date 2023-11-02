import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function UserInfo() {
  return (
    <></>
    // <Dropdown>
    //   <DropdownTrigger>
    //     <Avatar
    //       src="https://api.dicebear.com/7.x/adventurer/svg?seed=Misty"
    //       className="cursor-pointer"
    //     />
    //   </DropdownTrigger>
    //   <DropdownMenu aria-label="Static Actions">
    //     <DropdownItem
    //       key="delete"
    //       className="text-danger flex flex-row space-x-2 items-center justify-center"
    //       color="danger"
    //       onClick={() => signOut()}
    //     >
    //       <h6>Sair</h6>
    //     </DropdownItem>
    //   </DropdownMenu>
    // </Dropdown>
  );
}
