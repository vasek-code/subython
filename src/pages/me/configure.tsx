import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { StreamLabsIcon } from "../../components/StreamLabsIcon";
import { authOptions } from "../api/auth/[...nextauth]";
import Toastify from "toastify-js";
import Image from "next/image";

const ConfigurePage: NextPage<{
  streamLabsUser: any;
}> = ({ streamLabsUser }) => {
  console.log(streamLabsUser);

  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (router.query.error) {
      Toastify({
        text: router.query.error as string,
        duration: 3000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #f44336, #e91e63)",
        },
      }).showToast();
    }
  }, [router.query.error]);

  if (!session?.user?.streamLabsToken && status !== "loading") {
    return (
      <section className="divide flex h-full w-full flex-col px-10 pb-20">
        <div className="flex h-full w-full flex-row items-center justify-center">
          <div className="rounded-xl border-4 border-dashed border-stone-400 py-10 px-20">
            <h1 className="text-center text-4xl font-bold text-white">
              + Configure api key
            </h1>
            <h2 className="mt-2 text-center font-medium text-stone-500">
              In order to make timer work you need to <br /> connect your
              streamlabs account.
            </h2>
            <Link href="/api/streamlabs/redirect">
              <button className="mt-10 flex w-max flex-row items-center rounded-md bg-emerald-700 pr-3 text-xl font-bold text-white hover:bg-emerald-800">
                <StreamLabsIcon width={70} height={70} />
                Connect your streamlabs
              </button>
            </Link>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="flex h-full w-full flex-col px-10">
        <h1 className="w-max text-4xl font-bold text-white">
          streamlabs connected
          <div className="ml-2 inline-block h-5 w-5 rounded-full bg-green-500"></div>
        </h1>
        <div className="mt-5 mb-5 flex h-full w-full max-w-5xl flex-col rounded-xl border border-stone-700 bg-stone-800 p-5">
          <div className="flex">
            <div className="overflow-hidden rounded-full border border-stone-500">
              <Image
                src={streamLabsUser.streamlabs.thumbnail}
                width={100}
                height={100}
                quality={100}
                alt="streamlabs-icon"
              />
            </div>
            <div className="flex h-full flex-col justify-center pl-5">
              <h2 className="text-2xl font-medium text-white">
                {streamLabsUser.streamlabs.display_name}
              </h2>
              <h3 className="text-1xl font-medium text-stone-400">
                id: {streamLabsUser.streamlabs.id}
              </h3>
              <h3 className="text-1xl font-medium text-stone-400">
                username: {streamLabsUser.streamlabs.username}
              </h3>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default ConfigurePage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  if (session.user.streamLabsToken?.accessToken) {
    const streamLabsUserRes = await fetch(
      `https://streamlabs.com/api/v1.0/user?access_token=${session.user.streamLabsToken?.accessToken}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
      }
    );

    const streamLabsUser = await streamLabsUserRes.json();

    return {
      props: {
        streamLabsUser,
      },
    };
  }

  return {
    props: {},
  };
};
