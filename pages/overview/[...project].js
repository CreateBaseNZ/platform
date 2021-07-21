import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import {
  HintModule,
  VideoModule,
  InfoModule,
  SneakPeekModule,
  TutorialModule,
  ResourceModule,
} from "../../components/Modules";

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

const Overview = (props) => {
  const router = useRouter();
  const [project, setProject] = useState({});

  useEffect(() => {
    if (router.query.project) {
      setProject(DUMMY_QUERY[router.query.project[0]]);
    }
  }, [router.query]);

  return (
    <div className={classes.overview}>
      <Head>
        <title>
          Overview - {project ? project.name : "Create"} - CreateBase
        </title>
        <meta name="description" content={project ? project.caption : ""} />
      </Head>
      <Imagine />
      <div className={classes.divider} />
      <Define />
      <div className={classes.divider} />
      <Research project={project} />
      <div className={classes.divider} />
      <Plan />
      <div className={classes.divider} />
      <Create project={project} />
      <div className={classes.divider} />
      <Improve project={project} />
      <div className={classes.divider} />
      <Review />
    </div>
  );
};

export default Overview;
