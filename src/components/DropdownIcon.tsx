import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { UserIcon, UserRemoveIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export const DropdownIcon = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="hidden  text-right sm:block">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button>
              <Image
                src={session?.user?.image as string}
                alt="user-icon"
                draggable={false}
                className="hidden h-12 w-12 rounded-full sm:block"
                layout="fixed"
                width="48px"
                height="48px"
                quality={100}
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
              <div className="px-1 py-1">
                <Link href={status === "authenticated" ? "/me" : "/sign-in"}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-stone-700 text-white" : "text-white"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {status === "authenticated" ? (
                          <span className="mr-2 h-5">
                            <Image
                              src={session.user?.image as string}
                              alt="user-icon"
                              className="mr-2 h-5 w-5 rounded-full"
                              layout="fixed"
                              quality={100}
                              style={{
                                marginRight: "0.5rem",
                              }}
                              width="20px"
                              height="20px"
                            />
                          </span>
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
                )}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};
