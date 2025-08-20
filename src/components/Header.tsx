"use client";

import Link from "next/link";
import { FiLoader, FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { status, data } = useSession();

  const handleLogin = async () => {
    await signIn();
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
        <div className="pl-1 text-2xl uppercase tracking-[4px] duration-300 hover:tracking-[6px]">
          <Link href="/">
            Or<span className="text-blue-500">bit</span>
          </Link>
        </div>

        {status === "loading" && (
          <button className="animate-spin">
            <FiLoader size={26} color="#4b5563" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button onClick={handleLogin} className="cursor-pointer">
            <FiLogIn size={26} color="#4b5563" />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-baseline gap-4">
            <Link href="/dashboard">
              <FiUser size={26} color="#4b5563" />
            </Link>

            <button onClick={handleLogout} className="cursor-pointer">
              <FiLogOut size={26} color="#ff2313" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
