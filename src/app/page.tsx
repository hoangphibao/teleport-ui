"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Users from "@/components/users";

export default function Home() {
  const { data: session, status } = useSession();

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <Users />
      )
    } else if (status === "loading") {
      return (
        <span className="text-[#888] text-sm mt-7">Loading...</span>
      )
    } else {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center">
          <Link
            href="/login"
            className="text-[#888] text-sm text-999 mt-7 transition duration-150 ease hover:text-white"
          >
            Login here
          </Link>
        </main>

      )
    }
  }
  return (
    <>
      <Navbar />
      {showSession()}
    </>

  );
}
