import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";

import AuthForm from "../../components/Auth/AuthForm";

const Auth = ({ setLoaded }) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setLoaded(true);
    return () => setLoaded(false);
  }, []);

  useEffect(() => {
    if (Object.keys(router.query).length) {
      const query = router.query.authView;
      if (query) {
        setIsLogin(query[0] === "login");
      } else {
        setIsLogin(false);
      }
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>{isLogin ? "Log In" : "Sign Up"} | CreateBase</title>
        <meta name="description" content="Log into your CreateBase account" />
      </Head>
      <AuthForm isLogin={isLogin} />
    </>
  );
};

export default Auth;
