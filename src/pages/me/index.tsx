/* eslint-disable @typescript-eslint/no-empty-function */
import { GetServerSidePropsContext, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import React, { useEffect, useState } from "react";
import {
  faCopy,
  faEdit,
  faPlay,
  faSave,
  faStop,
} from "@fortawesome/free-solid-svg-icons";

import useTime from "../../hooks/useTime";
import { authOptions } from "../api/auth/[...nextauth]";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TimerSettingsComponent } from "../../components/TimerSettings";
import isNumber from "../../utils/is-number";
import { trpc } from "../../utils/trpc";
import { TimerSettings } from "@prisma/client";
import { useSession } from "next-auth/react";
import { reloadSession } from "../../utils/reload-session";
import alertError from "../../utils/alert-error";
import alertSuccess from "../../utils/alert-success";
import { useRouter } from "next/router";

const UserPage: NextPage<{
  id: string;
  socketToken: string | undefined | null;
}> = ({ id, socketToken }) => {
  const { data: session } = useSession();

  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  const [edit, setEdit] = useState(false);

  const { socket, time } = useTime(id);

  const [hours, setHours] = useState("000");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  const [timerSettings, setTimerSettings] = useState<TimerSettings>();

  const updateTimerSettingsMutation = trpc.useMutation([
    "user.saveTimerSettings",
  ]);

  useEffect(() => {
    if (!session?.user?.timerSettings) return;

    setTimerSettings(session.user.timerSettings);
  }, [session]);

  useEffect(() => {
    if (time[3] === ":") {
      setHours(`${time[0]}${time[1]}${time[2]}`);
      setMinutes(`${time[4]}${time[5]}`);
      setSeconds(`${time[7]}${time[8]}`);
    } else {
      setHours(`${time[0]}${time[1]}`);
      setMinutes(`${time[3]}${time[4]}`);
      setSeconds(`${time[6]}${time[7]}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit]);

  if (!socketToken) {
    return (
      <div className="flex h-full w-full items-center justify-center pt-28 text-white">
        <h1 className="text-center text-2xl">
          You need to{" "}
          <span>
            <button
              onClick={() => {
                router.push("/me/configure");
              }}
              className="rounded-md bg-emerald-700 p-2 hover:bg-emerald-800"
            >
              connect
            </button>
          </span>{" "}
          your streamlabs first.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center px-5 pb-5">
      <div
        className="flex h-full flex-col justify-between overflow-hidden rounded-xl bg-stone-800"
        style={{
          width: "700px",
        }}
      >
        <div className="w-full">
          <div className="w-full pt-8">
            {edit ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="flex w-full items-center justify-center gap-1 px-8"
                style={{
                  maxHeight: "96px",
                }}
              >
                <input
                  type="text"
                  onChange={(e) => {
                    if (!isNumber(e.target.value)) {
                      alertError("You can't type letters here.");

                      return;
                    }

                    if (
                      e.target.value.length > 3 ||
                      parseInt(e.target.value) > 595
                    ) {
                      alertError("Max value is 595.");

                      return;
                    }

                    setHours(e.target.value);
                  }}
                  value={hours}
                  className="flex w-48 items-center justify-center rounded-md bg-stone-600 text-center text-8xl font-semibold text-white hover:bg-stone-700 focus-visible:border-2 focus-visible:bg-stone-700 focus-visible:outline-none"
                  style={{
                    height: "96px",
                  }}
                />
                <span className="pb-3 text-8xl font-bold text-white">:</span>
                <input
                  type="text"
                  onChange={(e) => {
                    if (!isNumber(e.target.value)) {
                      alertError("You can't type letters here.");

                      return;
                    }

                    if (
                      e.target.value.length > 2 ||
                      parseInt(e.target.value) > 59
                    ) {
                      alertError("Max value is 59.");

                      return;
                    }

                    setMinutes(e.target.value);
                  }}
                  value={minutes}
                  className="flex w-32 items-center justify-center rounded-md bg-stone-600 text-center text-8xl font-semibold text-white hover:bg-stone-700 focus-visible:border-2 focus-visible:bg-stone-700 focus-visible:outline-none"
                  style={{
                    height: "96px",
                  }}
                />
                <span className="pb-2 text-8xl font-bold text-white">:</span>
                <input
                  type="text"
                  onChange={(e) => {
                    if (!isNumber(e.target.value)) {
                      alertError("You can't type letters here.");

                      return;
                    }

                    if (
                      e.target.value.length > 2 ||
                      parseInt(e.target.value) > 59
                    ) {
                      alertError("Max value is 59.");

                      return;
                    }

                    setSeconds(e.target.value);
                  }}
                  value={seconds}
                  className="flex w-32 items-center justify-center rounded-md bg-stone-600 text-center text-8xl font-semibold text-white hover:bg-stone-700 focus-visible:border-2 focus-visible:bg-stone-700 focus-visible:outline-none"
                  style={{
                    height: "96px",
                  }}
                />
              </form>
            ) : (
              <p className="text-center text-7xl font-semibold text-white sm:text-8xl">
                {time}
              </p>
            )}
          </div>
          <div className="flex w-full flex-row justify-center gap-8 px-5 pt-10">
            {session?.user?.timeState === "ACTIVE" ? (
              <button
                className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600"
                onClick={async () => {
                  socket?.emit("time_stop");
                  reloadSession();
                }}
                disabled={disabled}
              >
                <FontAwesomeIcon
                  icon={faStop}
                  color="white"
                  className="h-5 w-5"
                />
              </button>
            ) : (
              <button
                className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-80"
                onClick={async () => {
                  socket?.emit("time_unstop");
                  reloadSession();
                }}
                disabled={disabled}
              >
                <FontAwesomeIcon
                  icon={faPlay}
                  color="white"
                  className="h-5 w-5"
                />
              </button>
            )}

            <button
              className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600"
              onClick={async () => {
                setEdit(!edit);
              }}
            >
              <FontAwesomeIcon
                icon={faEdit}
                color="white"
                className="h-5 w-5"
              />
            </button>
            <button
              className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600"
              onClick={async () => {
                await navigator.clipboard.writeText(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/embed/${session?.user?.id}`
                );

                alertSuccess("Copied to clipboard!");
              }}
            >
              <FontAwesomeIcon
                icon={faCopy}
                color="white"
                className="h-5 w-5"
              />
            </button>
          </div>
        </div>
        <div className="flex h-full w-full flex-col gap-5 px-20 pt-8 pb-8">
          <TimerSettingsComponent
            setTimerSettings={setTimerSettings}
            timerSettings={timerSettings}
          />
        </div>
        <button
          className="flex h-9 w-full cursor-pointer items-center justify-center self-end bg-blue-500 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:bg-blue-500"
          disabled={
            edit === true ||
            JSON.stringify(timerSettings) !==
              JSON.stringify(session?.user?.timerSettings)
              ? false
              : true
          }
          onClick={async () => {
            if (edit) {
              const ms =
                parseInt(hours) * 3.6e6 +
                parseInt(minutes) * 60000 +
                parseInt(seconds) * 1000;

              socket?.emit("time_set", ms);
            }

            setDisabled(true);
            setEdit(false);
            setHours("000");
            setMinutes("00");
            setSeconds("00");

            await updateTimerSettingsMutation.mutateAsync(
              timerSettings as TimerSettings
            );

            reloadSession();

            setTimeout(() => {
              setDisabled(false);
            }, 1000);
          }}
        >
          <FontAwesomeIcon icon={faSave} color="white" className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};

export default UserPage;

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const serverSession = await unstable_getServerSession(req, res, authOptions);

  if (!serverSession?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      id: serverSession.user.id,
      socketToken: serverSession.user?.streamLabsToken?.socketToken || null,
    },
  };
};
