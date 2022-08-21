import { ClockIcon, CogIcon, UserIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { DropdownIcon } from "./DropdownIcon";

export const MePageLayout: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const router = useRouter();

  return (
    <main className="flex h-screen w-full flex-row">
      <section
        className="flex h-full flex-col bg-stone-800"
        style={{
          minWidth: "16rem",
        }}
      >
        <div className="flex h-28 w-full items-center pl-6">
          <Link href="/">
            <h1 className="cursor-pointer text-3xl font-extrabold text-white hover:text-opacity-80">
              Sub<span className="text-red-600">Y</span>
              <span className="text-white">T</span>hon
            </h1>
          </Link>
        </div>
        <div className="flex h-full w-full flex-col gap-1 px-3">
          <Link href="/me">
            <button
              className={`group flex w-full items-center rounded-md px-2 py-2 font-medium text-white hover:bg-stone-700 ${
                router.pathname === "/me" && "bg-stone-700"
              }`}
            >
              <ClockIcon className="mr-2 h-5 w-5" />
              Timer
            </button>
          </Link>
          <Link href="/me/configure">
            <button
              className={`group flex w-full items-center rounded-md px-2 py-2 font-medium text-white hover:bg-stone-700 ${
                router.pathname === "/me/configure" && "bg-stone-700"
              }`}
            >
              <CogIcon className="mr-2 h-5 w-5" />
              Configure
            </button>
          </Link>
          <Link href="/me/account">
            <button
              className={`group flex w-full items-center rounded-md px-2 py-2 font-medium text-white hover:bg-stone-700 ${
                router.pathname === "/me/account" && "bg-stone-700"
              }`}
            >
              <UserIcon className="mr-2 h-5 w-5" />
              Account
            </button>
          </Link>
        </div>
      </section>
      <section className="flex h-full w-full flex-col">
        <nav className="flex w-full items-center justify-end p-8">
          <DropdownIcon />
        </nav>
        {children}
      </section>
    </main>
  );
};
