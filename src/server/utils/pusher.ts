import Pusher from "pusher";
import { env } from "../../env/server.mjs";

export const pusher = new Pusher({
  appId: env.PUSHER_APP_ID,
  cluster: env.PUSHER_CLUSTER,
  key: env.PUSHER_KEY,
  secret: env.PUSHER_SECRET,
  useTLS: true,
});
