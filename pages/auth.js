import { useRouter } from "next/dist/client/router";
import { getSession } from "next-auth/client";
import { useEffect } from "react";

import AuthForm from "../components/Auth/AuthForm";

function AuthPage({ setLoaded }) {
  const router = useRouter();

  useEffect(() => {
    // EXAMPLE: Check if a user is logged in, and perform appropriate action
    getSession().then((session) => {
      if (session) {
        // Redirect to browse page if a user is logged in
        router.replace("/browse");
      } else {
        // Show login/signup page if a user is not logged in
        setLoaded(true);
        return () => setLoaded(false);
      }
    });
  }, []);

  return <AuthForm />;
}

export default AuthPage;
