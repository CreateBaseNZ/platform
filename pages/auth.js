import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { useEffect } from "react";

import AuthForm from "../components/Auth/AuthForm";

const Auth = ({ setLoaded }) => {
  const router = useRouter();

  useEffect(() => {
    // // EXAMPLE: Check if a user is logged in, and perform appropriate action
    // getSession().then((session) => {
    //   if (session) {
    //     // Redirect to browse page if a user is logged in
    //     router.replace("/browse");
    //   }
    // });
    setLoaded(true);
  }, []);

  return (
    <>
      <Head>
        <title>Login | CreateBase</title>
        <meta name="description" content="Log into your CreateBase account" />
      </Head>
      <AuthForm />
    </>
  );
};

export default Auth;
