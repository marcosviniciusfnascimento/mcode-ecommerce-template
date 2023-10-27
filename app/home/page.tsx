import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <div className="w-full flex items-center justify-center h-full">
        Hello {session?.user?.name}
      </div>
    );
  }
  return (
    <div className="w-full flex items-center justify-center h-full">
      Please log in to see this page
    </div>
  );
}
