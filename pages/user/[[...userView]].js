import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import Head from "next/head";
import MyAccount from "../../components/User/MyAccount";
import Header from "../../components/Header";
import axios from "axios";

import classes from "/styles/userView.module.scss";

const UserView = ({ setLoaded }) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [user, setUser] = useState({});
  const [view, setView] = useState("my-account");

  useEffect(() => {
    setLoaded(true);
    return () => setLoaded(false);
  }, []);

  useEffect(() => {
    console.log(router.query);
    if (Object.keys(router.query).length) {
      const query = router.query.userView;
      if (query) {
        setView(query[0]);
      }
    }
    setView("my-account");
  }, [router.query]);

  useEffect(async () => {
    if (session) {
      const input = ["email", "displayName"];
      let data;
      try {
        data = (await axios.post("/api/user/data/read", { input }))["data"];
      } catch (error) {
        data = { status: "error", content: error };
      }
      console.log(data);
      if (data.status === "error") {
        console.log("error"); // TODO
      }
      setUser({
        type: session.user.access,
        org: session.user.organisation,
        username: session.user.username,
        displayName: data.content.displayName, //TODO
        email: data.content.email, //TODO
      });
    }
  }, [session]);

  if (loading) return null;

  if (!session) {
    router.replace("/auth");
    return null;
  }

  console.log(session);

  return (
    <div className={classes.view}>
      <Head>
        <title style={{ textTransform: "capitalize" }}>
          {user.displayName && user.displayName + " | "} CreateBase
        </title>
        <meta name="description" content="CreateBase user settings" />
      </Head>
      <Header type={user.type} org={user.org} />
      {view === "my-account" && <MyAccount user={user} />}
    </div>
  );
};

export default UserView;
