import SignUpForm from "@/components/form/SignUpForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <span className="flex space-x-4">
      <Link href="/register">
        <Button className="dark hover:bg-teal-300">Register</Button>
      </Link>
      <Link href="/login">
        <Button className="dark hover:bg-teal-300">Login</Button>
      </Link>
      <Link href="/home">
        <Button className="dark hover:bg-teal-300">Home</Button>
      </Link>
    </span>
  );
}
