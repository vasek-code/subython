/* eslint-disable @next/next/no-img-element */
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  BellIcon,
  ChatAlt2Icon,
  ChevronDownIcon,
  UserIcon,
  UserRemoveIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export const DropdownIcon = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="hidden  text-right sm:block">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button>
              <img
                src={session?.user?.image as string}
                alt="user-icon"
                className="hidden h-12 w-12 rounded-full sm:block"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-stone-300 rounded-md bg-stone-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Link href="/features">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-stone-700 text-white" : "text-white"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <BellIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                        Features
                      </button>
                    )}
                  </Menu.Item>
                </Link>
                <a href="https://discord.gg" target="_blank" rel="noreferrer">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-stone-700 text-white" : "text-white"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <ChatAlt2Icon
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Discord
                      </button>
                    )}
                  </Menu.Item>
                </a>
              </div>
              <div className="px-1 py-1">
                <Link href="/sign-in">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-stone-700 text-white" : "text-white"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {status === "authenticated" ? (
                          <img
                            src={session.user?.image as string}
                            alt="user-icon"
                            className="mr-2 h-5 w-5"
                          />
                        ) : (
                          <UserIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                        {status === "unauthenticated"
                          ? "Sign in"
                          : session?.user?.name}
                      </button>
                    )}
                  </Menu.Item>
                </Link>
                {status === "authenticated" && (
                  <Link href="/sign-in">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-stone-700 text-white" : "text-white"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={() => {
                            signOut();
                          }}
                        >
                          <UserRemoveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Link>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};
