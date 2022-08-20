import { NextApiHandler } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const InitPusher: NextApiHandler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) return res.end("Please sign in first");

  return res.end("ok");
};

export default InitPusher;
