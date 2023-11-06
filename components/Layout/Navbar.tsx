import { MainNav } from "./MainNav";
import UserInfo from "./UserInfo";
import StoreSwitcher from "./storeSwitcher";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import db from "@/lib/db";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!userId) {
    redirect("/login");
  }

  const stores = await db.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserInfo />
        </div>
      </div>
    </div>
  );
}
