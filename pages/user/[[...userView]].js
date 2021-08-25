import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import classes from "/styles/userView.module.scss";
import { useEffect, useState } from "react";
import MyAccount from "../../components/User/MyAccount";
import Header from "../../components/Header";

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
      } else {
        setView("my-account");
      }
    }
  }, [router.query]);

  useEffect(() => {
    let type;
    if (session) {
      if (session.user.access.admin) {
        type = "admin";
      } else if (session.user.access.educator) {
        type = "educator";
      } else {
        type = "student";
      }
      setUser({
        type: type,
        org: session.user.organisation,
        username: session.user.username,
        display: "lorem", //TODO
        email: "lorem@ipsum.com", //TODO
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
      <Header type={user.type} />
      {view === "my-account" && <MyAccount user={user} />}
    </div>
  );
};

export default UserView;
