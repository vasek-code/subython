import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";

const UserPage: NextPage = () => {
  return (
    <div>
      <Link href="/api/streamlabs/redirect">
        <a className="text-white">connect streamlabs</a>
      </Link>
    </div>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};
