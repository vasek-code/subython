import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Header } from "../components/Header";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SubYTon</title>
      </Head>
      <Header />
      <main className="h-screen w-full">
        <div className="container flex h-full w-full flex-col px-5 pt-20 sm:px-32">
          <h1 className="text-7xl font-extrabold text-white">
            Sub<span className="text-red-600">Y</span>
            <span className="text-white">T</span>hon
            <span className="block text-red-300">timer</span>
          </h1>
          <h2 className="mt-3 text-xl text-gray-300">
            Easy, free, fast way to setup your <br />
            YouTube subathon timer.
          </h2>
          <div className="pt-10">
            <Link href="/sign-in">
              <a className="rounded-md bg-red-600 py-4 px-5 font-medium text-white hover:bg-red-700">
                Setup free account now
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
