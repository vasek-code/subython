import { NextApiHandler } from "next";
import { unstable_getServerSession } from "next-auth";
import { pusher } from "../../../server/utils/pusher";
import { authOptions } from "../auth/[...nextauth]";

const getCurrentUnix = () => {
  return Math.floor(new Date().getTime() / 1000);
};

const InitPusher: NextApiHandler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) return res.end("Please sign in first");

  setInterval(() => {
    pusher.trigger(session.user?.id as string, "time-update", getCurrentUnix());
  }, 1000);

  res.end("ok");
};

export default InitPusher;
