import { GetServerSidePropsContext, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { StreamLabsIcon } from "../../components/StreamLabsIcon";
import { authOptions } from "../api/auth/[...nextauth]";
import Image from "next/image";
import { EyeIcon } from "@heroicons/react/solid";
import { faYoutube, faTwitch } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { trpc } from "../../utils/trpc";
import { reloadSession } from "../../utils/reload-session";
import alertError from "../../utils/alert-error";

const ConfigurePage: NextPage = () => {
  const { data: session, status } = useSession();

  const deleteTokenMutation = trpc.useMutation(["user.deleteStreamlabsToken"]);

  console.log(
    "STREAMLABS USER ON CONFIGURE PAGE: ",
    session?.user?.streamLabsToken?.streamLabsUser
  );

  const router = useRouter();

  const [socketTokenVisible, setSocketTokenVisible] = useState(false);

  useEffect(() => {
    if (router.query.error) {
      alertError(router.query.error as string);
    }
  }, [router.query.error]);

  if (status === "loading") {
    return <>loading...</>;
  }

  if (!session?.user?.streamLabsToken) {
    return (
      <section className="divide flex h-full w-full flex-col py-44 px-10">
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
  }

  if (
    session?.user?.streamLabsToken?.streamLabsUser &&
    session?.user?.streamLabsToken
  ) {
    return (
      <section className="flex h-full w-full flex-col px-10">
        <h1 className="w-max text-4xl font-bold text-white">
          streamlabs connected
          <div className="ml-2 inline-block h-5 w-5 rounded-full bg-green-500"></div>
        </h1>
        <div className="mt-5 mb-5 flex w-full max-w-2xl flex-col rounded-xl border border-stone-700 bg-stone-800 p-5">
          <div className="flex">
            <div
              className="overflow-hidden rounded-full border border-stone-500"
              style={{
                width: "100px",
                height: "100px",
              }}
            >
              <Image
                src={
                  session?.user?.streamLabsToken?.streamLabsUser.streamlabs
                    .thumbnail as string
                }
                width="100px"
                height="100px"
                quality={100}
                alt="streamlabs-icon"
              />
            </div>
            <div className="flex h-full flex-col justify-center pl-5">
              <h2 className="text-2xl font-medium text-white">
                {
                  session?.user?.streamLabsToken?.streamLabsUser.streamlabs
                    ?.display_name
                }
              </h2>
              <h3 className="text-1xl font-medium text-stone-400">
                id:{" "}
                {session?.user?.streamLabsToken?.streamLabsUser.streamlabs?.id}
              </h3>
              <h3 className="text-1xl font-medium text-stone-400">
                username:{" "}
                {
                  session?.user?.streamLabsToken?.streamLabsUser.streamlabs
                    ?.username
                }
              </h3>
            </div>
          </div>
          <div className="mt-10  flex h-full w-full flex-col">
            <div className="flex w-full flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h2 className="text-xl text-white">Your Socket API Token</h2>
                <div className="relative flex items-center">
                  <EyeIcon
                    className="absolute ml-3 h-5 w-5 cursor-pointer text-stone-400 hover:text-stone-500"
                    onClick={() => {
                      setSocketTokenVisible(!socketTokenVisible);
                    }}
                  />
                  <input
                    type={socketTokenVisible ? "text" : "password"}
                    disabled
                    defaultValue={session.user.streamLabsToken.socketToken}
                    className="h-8 w-80 rounded-md bg-neutral-900 px-3 pl-10 text-stone-400"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-xl text-white">Services connected</h2>
                <div className="relative flex items-center gap-3">
                  {session?.user?.streamLabsToken?.streamLabsUser.youtube && (
                    <a
                      href={`https://youtube.com/channel/${session?.user?.streamLabsToken?.streamLabsUser.youtube.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faYoutube}
                        color="#ff0000"
                        className="h-12 w-12"
                      />
                    </a>
                  )}
                  {session?.user?.streamLabsToken?.streamLabsUser.twitch && (
                    <a
                      href={`https://twitch.tv/${session?.user?.streamLabsToken?.streamLabsUser.twitch.name}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon
                        icon={faTwitch}
                        color="#8a45f1"
                        className="h-10 w-10"
                      />
                    </a>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-xl text-white">Ready for timer?</h2>
                <div className="relative flex items-center">
                  {session?.user?.streamLabsToken?.streamLabsUser.youtube &&
                  session.user.streamLabsToken.accessToken &&
                  session.user.streamLabsToken.socketToken ? (
                    <h2 className="flex h-full items-center text-lg text-white">
                      Yes
                      <div className="ml-2 inline-block h-5 w-5 rounded-full bg-green-500"></div>
                    </h2>
                  ) : (
                    <h2 className="flex h-full items-center text-lg text-white">
                      No
                      <div className="ml-2 inline-block h-5 w-5 rounded-full bg-red-500"></div>
                    </h2>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  className="w-min rounded-md bg-youtube p-3 font-medium text-white hover:bg-red-600"
                  onClick={async () => {
                    await deleteTokenMutation.mutateAsync(null);
                    reloadSession();
                  }}
                >
                  Disconnect
                </button>
                <Link href="/api/streamlabs/redirect">
                  <button className="w-min rounded-md bg-blue-600 p-3 font-medium text-white hover:bg-blue-700">
                    Refresh
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <>error</>;
};
export default ConfigurePage;

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
