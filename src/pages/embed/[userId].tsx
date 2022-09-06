import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import useTime from "../../hooks/useTime";

const EmbedPage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { time } = useTime(userId as string);

  return (
    <>
      <style jsx global>
        {`
          html {
            background-image: none !important;
            background-color: transparent !important;
          }
        `}
      </style>
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-8xl text-white">{time}</p>
      </div>
    </>
  );
};

export default EmbedPage;
