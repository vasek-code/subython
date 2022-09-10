import { TimeState } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Server, ServerOptions, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { prisma } from "../../../server/db/client";
import io from "socket.io-client2";

async function getCurrentTime(userId: string) {
  const startTime = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      time: true,
    },
  });

  const { time } = { ...startTime };

  return time as number;
}

async function getCurrentState(userId: string) {
  const currentState = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      timeState: true,
    },
  });

  const stateCopy = { ...currentState };

  const { timeState } = { ...stateCopy };

  return timeState as TimeState;
}

async function setStateStop(userId: string) {
  await prisma.user.update({
    data: {
      timeState: "STOPPED",
    },
    where: {
      id: userId,
    },
  });
}

async function setStateStart(userId: string) {
  await prisma.user.update({
    data: {
      timeState: "ACTIVE",
    },
    where: {
      id: userId,
    },
  });
}

async function setTime({ userId, time }: { userId: string; time: number }) {
  await prisma.user.update({
    data: {
      time,
    },
    where: {
      id: userId,
    },
  });
}

export default async function SocketHandler(
  req: NextApiRequest,
  res: NextApiResponse & {
    socket: {
      server: Partial<ServerOptions> & {
        io: // eslint-disable-next-line @typescript-eslint/no-explicit-any
        | Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
          | undefined
          | null;
      };
    };
  }
) {
  if (res.socket.server.io) {
    console.log("socket already set");
    res.end();
    return;
  }

  const SERVER_IO = new Server(res.socket.server);

  res.socket.server.io = SERVER_IO;

  const onConnection = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) => {
    socket.on(
      "join_room",
      async ({ roomId, userId }: { roomId: string; userId: string }) => {
        if (!roomId || !userId) return;

        const user = await prisma.user.findFirst({
          where: {
            id: userId,
          },
          select: {
            streamLabsToken: true,
          },
        });

        const STREAMLABS_SOCKET = io(
          `https://sockets.streamlabs.com?token=${user?.streamLabsToken?.socketToken}`,
          { transports: ["websocket"] }
        );

        STREAMLABS_SOCKET.on("connect", () => {
          console.log("CONNECTED TO STREAMLABS");
        });

        const startTime = await getCurrentTime(userId);

        await socket.join(roomId);
        await socket.join(userId);

        SERVER_IO.to(roomId).emit("time_update", startTime);

        let GLOBAL_TIME = startTime;

        let i = 0;

        const interval = setInterval(async () => {
          const state = await getCurrentState(userId);

          i++;
          if (i === 1) {
            socket.on("time_stop", async () => {
              const currentState = await getCurrentState(userId);

              if (currentState === "STOPPED") return;

              await setStateStop(userId);

              SERVER_IO.to(userId).emit("time_update", GLOBAL_TIME);

              await setTime({ userId, time: GLOBAL_TIME });

              SERVER_IO.to(userId).emit("reload_session");
            });

            socket.on("time_unstop", async () => {
              const currentState = await getCurrentState(userId);

              if (currentState === "ACTIVE") return;

              SERVER_IO.to(userId).emit("time_update", GLOBAL_TIME);

              await setStateStart(userId);

              SERVER_IO.to(userId).emit("reload_session");
            });

            socket.on("time_set", async (time: number) => {
              await setStateStop(userId);

              await setTime({ userId, time });

              GLOBAL_TIME = time;

              SERVER_IO.to(userId).emit("time_update", GLOBAL_TIME);
            });

            STREAMLABS_SOCKET.on(
              "event",
              async (data: {
                type: "donation" | "superchat" | "follow" | "subscription";
                message: {
                  name: string;
                  isTest: boolean;
                  formatted_amount: string;
                  amount: number;
                  message: string;
                  currency: string;
                  to: {
                    name: string;
                  };
                  from: string;
                  from_user_id: number;
                  _id: string;
                  priority: number;
                  sub_plan: string;
                }[];
              }) => {
                if (!data.message[0]) return;

                const timerSettings = await prisma.timerSettings.findFirst({
                  where: {
                    userId: userId,
                  },
                });

                if (!timerSettings) return;

                switch (data.type) {
                  case "donation":
                    if (!timerSettings.donationsOn) return;
                    (() => {
                      const timeForOneDollar =
                        timerSettings.secondsDonation /
                        timerSettings.perDonation;

                      GLOBAL_TIME +=
                        data.message[0].amount * timeForOneDollar * 1000;
                    })();

                    break;
                  case "superchat":
                    if (!timerSettings.superchatOn) return;

                    (() => {
                      const timeForOneDollar =
                        timerSettings.secondsSuperchat /
                        timerSettings.perSuperchat;

                      GLOBAL_TIME +=
                        parseInt(
                          `${data.message[0].amount.toLocaleString()[0]}${
                            data.message[0].amount.toLocaleString()[1]
                          }`
                        ) *
                        timeForOneDollar *
                        1000;
                    })();

                    break;
                  case "follow":
                    if (!timerSettings.subscribersOn) return;

                    GLOBAL_TIME += timerSettings.secondsSubscriber * 1000;

                    break;
                  case "subscription":
                    if (!timerSettings.membersOn) return;

                    const subTypes = [
                      timerSettings.member1Name,
                      timerSettings.member2Name,
                      timerSettings.member3Name,
                      timerSettings.member4Name,
                      timerSettings.member5Name,
                      timerSettings.member6Name,
                    ];

                    subTypes.forEach((type, index) => {
                      index++;
                      if (data.message[0]?.sub_plan === type) {
                        GLOBAL_TIME +=
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          timerSettings[`member${index}Secoonds`] * 1000;
                      }
                    });

                    break;
                  default:
                  // code block
                }

                SERVER_IO.to(userId).emit("time_update", GLOBAL_TIME);

                await setTime({ userId, time: GLOBAL_TIME });
              }
            );
          }

          if (state === "ACTIVE") {
            if (!(GLOBAL_TIME <= 0)) {
              GLOBAL_TIME -= 1000;
            } else {
              GLOBAL_TIME = 0;
            }

            SERVER_IO.to(roomId).emit("time_update", GLOBAL_TIME);

            await setTime({ userId, time: GLOBAL_TIME });
          } else {
            GLOBAL_TIME = await getCurrentTime(userId);
          }
        }, 1000);

        socket.on("disconnect", () => {
          clearInterval(interval);
          STREAMLABS_SOCKET.disconnect();
        });
      }
    );
  };

  SERVER_IO.on("connection", onConnection);

  res.end();
}
