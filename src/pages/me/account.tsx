import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";

const AccountPage: NextPage = () => {
  return <div>account</div>;
};

export default AccountPage;

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
