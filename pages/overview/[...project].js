import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import classes from "/styles/Overview.module.scss";
import GreenButton from "../../components/UI/GreenButton";
import Imagine from "../../components/OverView/Imagine";
import Define from "../../components/OverView/Define";
import Research from "../../components/OverView/Research";
import Plan from "../../components/Overview/Plan";
import Create from "../../components/Overview/Create";
import Improve from "../../components/Overview/Improve";
import Review from "../../components/Overview/Review";

const DUMMY_QUERY = {
  "send-it": {
    query: "send-it",
    name: "Send It",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non aliquam augue. Nullam nunc purus, iaculis at congue a, varius vel massa. Suspendisse eget pharetra ipsum. Praesent vulputate ipsum laoreet tempor viverra. Curabitur vehicula bibendum facilisis. Duis tincidunt mauris ac sem imperdiet imperdiet.",
    stacked: true,
  },
};

const Overview = ({ setLoaded }) => {
  const router = useRouter();
  const [project, setProject] = useState({});
  const [unlocked, setUnlocked] = useState({ define: {}, plan: {} });

  useEffect(() => {
    console.log(router.query);
    if (router.query.project) {
      setProject(DUMMY_QUERY[router.query.project[0]]);
    }
  }, [router.query]);

  useEffect(() => {
    setUnlocked({
      define: {
        0: localStorage.getItem("run-it-down__define-unlocked__0"),
        1: localStorage.getItem("run-it-down__define-unlocked__1"),
      },
      research: localStorage.getItem("run-it-down__research-unlocked"),
      plan: {
        0: localStorage.getItem("run-it-down__plan-unlocked__0"),
        1: localStorage.getItem("run-it-down__plan-unlocked__1"),
        2: localStorage.getItem("run-it-down__plan-unlocked__2"),
        3: localStorage.getItem("run-it-down__plan-unlocked__3"),
      },
      create: true,
      improve: localStorage.getItem("run-it-down__improve-unlocked"),
    });
    setTimeout(() => setLoaded(true), []);
  }, []);

  return (
    <div className={classes.overview}>
      <Head>
        <title>
          Overview - {project ? project.name : "Create"} - CreateBase
        </title>
        <meta name="description" content={project ? project.caption : ""} />
      </Head>
      <Imagine setUnlocked={setUnlocked} />
      <div className={classes.divider} />
      <Define
        unlocked={Object.values(unlocked.define).every(Boolean)}
        setUnlocked={setUnlocked}
      />
      <div className={classes.divider} />
      <Research
        project={project}
        unlocked={unlocked.research}
        setUnlocked={setUnlocked}
      />
      <div className={classes.divider} />
      <Plan
        unlocked={Object.values(unlocked.plan).every(Boolean)}
        setUnlocked={setUnlocked}
      />
      <div className={classes.divider} />
      <Create
        project={project}
        unlocked={Object.values(unlocked.plan).every(Boolean)}
      />
      <div className={classes.divider} />
      <Improve project={project} unlocked={unlocked.improve} />
      <div className={classes.divider} />
      <Review />
    </div>
  );
};

export default Overview;
