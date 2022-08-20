/* eslint-disable @typescript-eslint/no-empty-function */

import type { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { timeConverter } from "../utils/time-converter";

const Home: NextPage<{
  initTime: number;
}> = ({ initTime }) => {
  const [currentTime, setCurrentTime] = useState(initTime);

  const { status } = useSession();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prevState) => prevState - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Head>
        <title>SubYThon</title>
      </Head>
      <main className="max-h-screen min-h-screen w-full">
        <Header />
        <section className="min-h-full w-full">
          <div className="container flex flex-col px-5 pt-10 sm:px-32 sm:pt-20 lg:flex-row">
            <div className="flex h-full w-full flex-col">
              <h1 className="text-7xl font-extrabold text-white">
                Sub<span className="text-red-600">Y</span>
                <span className="text-white">T</span>hon
                <span className="block text-red-300">timer</span>
              </h1>
              <h2 className="mt-3 text-xl text-gray-300">
                Easy, free, fast way to setup your <br />
                YouTube subathon timer that works <br /> with{" "}
                <a
                  href="https://streamlabs.com/"
                  rel="noreferrer"
                  target="_blank"
                  className="cursor-pointer text-gray-400"
                >
                  streamlabs{" "}
                </a>
                completely on web.
              </h2>
              <div className="pt-10">
                <Link href={status === "unauthenticated" ? "/sign-in" : "/me"}>
                  <a className="rounded-md bg-red-600 py-4 px-5 font-medium text-white hover:bg-red-700">
                    {status === "unauthenticated"
                      ? "Setup free account now"
                      : "Setup your timer now"}
                  </a>
                </Link>
              </div>
            </div>
            <div className="flex w-full items-center justify-center pt-20 lg:pt-0">
              <h2 className="h-min text-7xl font-bold text-white sm:text-8xl">
                {timeConverter(currentTime).hour.toLocaleString().length === 2
                  ? timeConverter(currentTime).hour.toLocaleString()
                  : `0${timeConverter(currentTime).hour.toLocaleString()}`}
                :
                {timeConverter(currentTime).min.toLocaleString().length === 2
                  ? timeConverter(currentTime).min.toLocaleString()
                  : `0${timeConverter(currentTime).min.toLocaleString()}`}
                :
                {timeConverter(currentTime).sec.toLocaleString().length === 2
                  ? timeConverter(currentTime).sec.toLocaleString()
                  : `0${timeConverter(currentTime).sec.toLocaleString()}`}
              </h2>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const initTime = Math.floor(new Date().getTime() / 1000);

  return {
    props: {
      initTime,
    },
  };
};
