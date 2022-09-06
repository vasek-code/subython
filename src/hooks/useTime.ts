/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client1";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { convertMsToTime } from "../utils/ms-to-time";

export default function useTime(userId: string) {
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const [time, setTime] = useState(convertMsToTime(0));

  useEffect(() => {
    if (socket) return;

    fetch("/api/socket").then(() => {
      setSocket(io());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!socket) return;

    const guid = () => {
      const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      };

      return (
        s4() +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        "-" +
        s4() +
        s4() +
        s4()
      );
    };

    const roomId = guid();

    socket.on("connect", () => {
      console.log("CONNECTED");

      socket.emit("join_room", { roomId, userId });
    });

    socket.on("time_update", (time: number) => {
      setTime(convertMsToTime(time));

      console.log(time);
    });
  }, [socket, userId]);

  return { time, socket };
}
