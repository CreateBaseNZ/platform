import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useUnity from "/hooks/useUnity";
import Head from "next/head";
import Game from "../../components/Game";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import classes from "/styles/Play.module.scss";

const DUMMY_QUERY = {
  "send-it": {
    query: "send-it",
    name: "Send It",
  },
};

const Play = ({ setLoaded }) => {
  const router = useRouter();
  const [project, setProject] = useState({});
  const [unityContext, sensorData, gameState, resetScene] = useUnity({
    scene: "research",
  });

  useEffect(() => {
    if (router.query.project) {
      setProject(DUMMY_QUERY[router.query.project[0]]);
    }
  }, [router.query]);

  useEffect(() => {
    setTimeout(() => setLoaded(true), [500]);
  }, []);

  return (
    <div className={classes.play}>
      <Head>
        <title>Play - {project.name} | CreateBase</title>
        <meta name="description" content={project.caption} />
      </Head>
      <Link
        href={{
          pathname: "/overview/[project]",
          query: { project: "send-it" },
          hash: "research",
        }}
      >
        <button className={classes.backButton} title="Back to overview">
          <ExitToAppIcon />
        </button>
      </Link>
      <Game unityContext={unityContext} />
    </div>
  );
};

export default Play;
