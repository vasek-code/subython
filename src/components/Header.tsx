/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Dropdown } from "./Dropdown";
import { DropdownIcon } from "./DropdownIcon";

export const Header: React.FC = () => {
  const { status } = useSession();

  return (
    <header className="container flex w-full justify-end bg-transparent  py-8 px-5 sm:justify-between sm:px-7 md:px-16 lg:px-20">
      <div className="hidden items-center gap-8 sm:flex">
        <Link href="/features">
          <a className="text-base font-medium text-white hover:text-gray-200">
            Features
          </a>
        </Link>

        <a
          className="text-base font-medium text-white hover:text-gray-200"
          href="https://discord.gg"
          target="_blank"
          rel="noreferrer"
        >
          Discord
        </a>
      </div>
      <div className="">
        {status === "unauthenticated" ? (
          <Link href="sign-in">
            <a className="hidden rounded-md border-2 border-white py-3 px-5 font-medium text-white hover:bg-stone-800 sm:inline ">
              Sign in
            </a>
          </Link>
        ) : (
          <DropdownIcon />
        )}

        <Dropdown />
      </div>
    </header>
  );
};
