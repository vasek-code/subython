import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { useRouter } from "next/router";
import React from "react";
import { reloadSession } from "../../utils/reload-session";
import { trpc } from "../../utils/trpc";
import { authOptions } from "../api/auth/[...nextauth]";

const AccountPage: NextPage = () => {
  const deleteAccountMutation = trpc.useMutation(["user.deleteAccount"]);

  const router = useRouter();

  return (
    <div className="w-full px-5">
      <button
        className="w-max rounded-md bg-youtube p-3 font-medium text-white hover:bg-red-600"
        onClick={async () => {
          await deleteAccountMutation.mutateAsync();
          router.push("/");
          reloadSession();
        }}
      >
        Delete account
      </button>
    </div>
  );
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
