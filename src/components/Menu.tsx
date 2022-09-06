import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  ClockIcon,
  CogIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export const Menu = () => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <section
        className="fixed hidden h-screen flex-col bg-stone-800 lg:flex"
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

      {opened && (
        <div className="fixed z-10 h-screen w-screen bg-black opacity-50"></div>
      )}

      <section className="fixed z-20 h-screen flex-col bg-stone-800 lg:hidden">
        <div
          className={`flex h-full w-full flex-col gap-1 px-3 pt-2`}
          style={{
            minWidth: opened ? "14rem" : "auto",
          }}
        >
          <button
            className={`mb-4 flex w-min items-center rounded-md px-2 py-2 text-white hover:bg-stone-700 ${
              router.pathname === "/" && "bg-stone-700"
            }`}
            onClick={() => {
              setOpened(!opened);
            }}
          >
            {opened ? (
              <ArrowNarrowLeftIcon className="h-6 w-6" />
            ) : (
              <ArrowNarrowRightIcon className="h-6 w-6" />
            )}
          </button>
          {opened ? (
            <>
              <Link href="/">
                <button
                  className={`flex min-w-full items-center rounded-md px-2 py-2 text-white hover:bg-stone-700 ${
                    router.pathname === "/" && "bg-stone-700"
                  }`}
                >
                  <HomeIcon className="h-6 w-6" />
                  <h1 className="ml-2 font-medium">Home</h1>
                </button>
              </Link>
              <Link href="/me">
                <button
                  className={`flex min-w-full items-center rounded-md px-2 py-2 text-white hover:bg-stone-700 ${
                    router.pathname === "/me" && "bg-stone-700"
                  }`}
                >
                  <ClockIcon className="h-6 w-6" />
                  <h1 className="ml-2 font-medium">Timer</h1>
                </button>
              </Link>
              <Link href="/me/configure">
                <button
                  className={`flex min-w-full items-center rounded-md px-2 py-2 text-white hover:bg-stone-700 ${
                    router.pathname === "/me/configure" && "bg-stone-700"
                  }`}
                >
                  <CogIcon className="h-6 w-6" />
                  <h1 className="ml-2 font-medium">Configure</h1>
                </button>
              </Link>
              <Link href="/me/account">
                <button
                  className={`flex min-w-full items-center rounded-md px-2 py-2 text-white hover:bg-stone-700 ${
                    router.pathname === "/me/account" && "bg-stone-700"
                  }`}
                >
                  <UserIcon className="h-6 w-6" />
                  <h1 className="ml-2 font-medium">Account</h1>
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/">
                <button
                  className={`flex w-min items-center rounded-md px-2 py-2 text-white hover:bg-stone-700 ${
                    router.pathname === "/" && "bg-stone-700"
                  }`}
                >
                  <HomeIcon className="h-6 w-6" />
                </button>
              </Link>
              <Link href="/me">
                <button
                  className={`flex w-min items-center rounded-md px-2 py-2 text-white hover:bg-stone-700 ${
                    router.pathname === "/me" && "bg-stone-700"
                  }`}
                >
                  <ClockIcon className="h-6 w-6" />
                </button>
              </Link>
              <Link href="/me/configure">
                <button
                  className={`flex w-min items-center rounded-md px-2 py-2 text-white hover:bg-stone-700 ${
                    router.pathname === "/me/configure" && "bg-stone-700"
                  }`}
                >
                  <CogIcon className="h-6 w-6" />
                </button>
              </Link>
              <Link href="/me/account">
                <button
                  className={`flex w-min items-center rounded-md px-2 py-2 text-white hover:bg-stone-700 ${
                    router.pathname === "/me/account" && "bg-stone-700"
                  }`}
                >
                  <UserIcon className="h-6 w-6" />
                </button>
              </Link>
            </>
          )}
        </div>
      </section>
    </>
  );
};
