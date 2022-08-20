/* eslint-disable @typescript-eslint/no-empty-function */

import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { env } from "../env/client.mjs";

function timeConverter(UNIX_timestamp: number) {
  const date = new Date(UNIX_timestamp * 1000);

  const hour = date.getHours();
  const min = date.getMinutes();
  let sec = date.getSeconds().toLocaleString();

  if (sec.toLocaleString().length !== 2) {
    sec = "0" + sec.toLocaleString();
  }

  const time = hour + ":" + min + ":" + sec;

  return time;
}

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated" || !session?.user?.id) return () => {};

    const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
      forceTLS: true,
    });

    const channel = pusher.subscribe(session?.user?.id as string);

    channel.bind("time-update", (data: string) => {
      setCurrentTime(parseInt(data));
    });

    fetch("http://localhost:3000/api/pusher/init")
      .then((res) => res.text())
      .then((data) => console.log(data));

    return () => {
      pusher.unsubscribe(session?.user?.id as string);
    };
  }, [session?.user?.id, status]);

  return (
    <>
      <Head>
        <title>SubYTon</title>
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
            <div className="flex w-full items-center justify-center pt-20 lg:pt-0">
              <h2 className="h-min text-7xl font-bold text-white sm:text-8xl">
                {timeConverter(currentTime)}
              </h2>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
