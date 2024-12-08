"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname();
    const { data: session, status } = useSession();

    return (
        <nav className="container mx-auto px-[15px]">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-xl">
                    <Link href="/">Teleport Dashboard</Link>
                </h1>
                <ul className="flex space-x-2 items-center -mr-[1rem]">
                    {session ? (
                        <li>
                            <span className="text-[#888] text-sm mt-7">Hello, {session?.user?.name}</span>
                            <button
                                className="text-[#888] text-sm text-999 mt-7 transition duration-150 ease hover:text-white pl-10"
                                onClick={() => signOut()}
                            >
                                Sign out
                            </button>
                        </li>
                    ) : (
                            <Link
                                href="/login"
                                className="text-[#888] text-sm text-999 mt-7 transition duration-150 ease hover:text-white"
                            >
                                Login here
                            </Link>
                    )}
                </ul>
            </div>
        </nav>
    );
}