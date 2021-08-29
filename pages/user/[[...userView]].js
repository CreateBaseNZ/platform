import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import Head from "next/head";
import MyAccount from "../../components/MyAccount/MyAccount";
import Header from "../../components/Header";
import axios from "axios";

import classes from "/styles/userView.module.scss";

const UserView = ({ setLoaded }) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [user, setUser] = useState();
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
        console.log("error"); // TODO handle error
      }
      setUser({
        type: session.user.access,
        org: {
          name: "Shelly Park Primary School",
          city: "Auckland",
          country: "New Zealand",
          educators: 69,
          learners: 420,
        },
        username: session.user.username,
        displayName: data.content.displayName,
        email: data.content.email,
      });
    }
  }, [session]);

  if (loading) return null;

  if (!session) {
    router.replace("/auth");
    return null;
  }

  if (!user) return null;

  return (
    <div className={classes.view}>
      <Head>
        <title style={{ textTransform: "capitalize" }}>
          {user.displayName && user.displayName + " | "} CreateBase
        </title>
        <meta name="description" content="CreateBase user settings" />
      </Head>
      <Header
        session={session}
        type={user.type}
        org={user.org}
        name={user.displayName}
      />
      {view === "my-account" && <MyAccount user={user} setUser={setUser} />}
    </div>
  );
};

export default UserView;
