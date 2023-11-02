import SettingsForm from "@/components/form/SettingsForm";
import useCheckAuth from "@/hooks/useCheckAuth";
import db from "@/lib/db";
import { redirect } from "next/navigation";

interface SettingsPageProps {
  params: {
    storeid: string;
  };
}
export default async function SettingsPage(props: SettingsPageProps) {
  const { params } = props;
  const userId = await useCheckAuth();

  if (!userId) {
    redirect("/login");
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeid,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
}
