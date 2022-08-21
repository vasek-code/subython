import { NextApiHandler } from "next";
import { env } from "../../../env/server.mjs";
import FormData from "form-data";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const StreamLabsAuth: NextApiHandler = async (req, res) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    console.log(req.query);
    console.log(req.body);

    const code = req.query.code as string;

    console.log(code);

    const formTokenData = new FormData();

    formTokenData.append("grant_type", "authorization_code");
    formTokenData.append("client_id", env.SL_CLIENT_ID);
    formTokenData.append("client_secret", env.SL_CLIENT_SECRET);
    formTokenData.append(
      "redirect_uri",
      "http://localhost:3000/api/streamlabs/callback"
    );
    formTokenData.append("code", code);

    const tokenRes = await fetch(
      `https://streamlabs.com/api/v1.0/token`,

      {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formTokenData as unknown as BodyInit,
      }
    );

    const tokenData: {
      access_token: string;
      token_type: string;
      expires_in: number;
      refresh_token: string;
    } = await tokenRes.json();

    const formSocketData = new FormData();

    formSocketData.append("access_token", tokenData.access_token);

    const socketRes = await fetch(
      `https://streamlabs.com/api/v1.0/socket/token?access_token=${tokenData.access_token}`,
      {
        method: "GET",
        headers: { Accept: "application/json" },
      }
    );

    const socketData: {
      socket_token: string;
    } = await socketRes.json();

    console.log(socketData);

    const stToken = await prisma?.streamLabsToken.upsert({
      create: {
        accessToken: tokenData.access_token,
        expires_in: tokenData.expires_in,
        refreshToken: tokenData.refresh_token,
        socketToken: socketData.socket_token,
        userId: session?.user?.id as string,
      },
      update: {
        accessToken: tokenData.access_token,
        expires_in: tokenData.expires_in,
        refreshToken: tokenData.refresh_token,
        socketToken: socketData.socket_token,
      },
      where: {
        userId: session?.user?.id as string,
      },
    });

    console.log(stToken);

    res.redirect("/me");
  } catch (e) {
    res.redirect(
      encodeURI(
        "/me/configure?error=Your streamlabs account is already connected."
      )
    );
  }
};

export default StreamLabsAuth;
