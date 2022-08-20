import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { NextPage } from "next";
import React from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

const SignInPage: NextPage = () => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <Link href="/">
        <h1 className="mb-7 cursor-pointer text-7xl font-extrabold text-white hover:text-opacity-80">
          Sub<span className="text-red-600">Y</span>
          <span className="text-white">T</span>hon
        </h1>
      </Link>
      <div className="w-96 divide-y divide-stone-600 rounded-md border border-stone-600 bg-stone-800 p-5">
        <button
          className="mb-7 w-full rounded-md bg-red-500 py-10 text-2xl font-bold text-white hover:bg-red-600"
          onClick={() => {
            signIn("google");
          }}
        >
          <FontAwesomeIcon icon={faYoutube} className="mr-3" />
          Sign in with YouTube
        </button>
        <h3 className="w-full pt-6 text-xs text-stone-500">
          By signing in, you agree to our{" "}
          <span className="cursor-pointer text-red-300">Terms of Service</span>{" "}
          and{" "}
          <span className="cursor-pointer text-red-300">Privacy Policy</span>.
        </h3>
      </div>
    </main>
  );
};

export default SignInPage;
