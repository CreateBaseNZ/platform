import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useUnity from "/hooks/useUnity";
import Head from "next/head";
import Game from "../../components/Game";

import classes from "/styles/Play.module.scss";

const DUMMY_QUERY = {
  "run-it-down": {
    query: "run-it-down",
    name: "Run It Down",
  },
};

const Play = () => {
  const router = useRouter();
  const [project, setProject] = useState({});
  const [unityContext, sensorData, gameState, resetScene] = useUnity();

  useEffect(() => {
    if (router.query.project) {
      setProject(DUMMY_QUERY[router.query.project[0]]);
    }
  }, [router.query]);

  return (
    <div className={classes.play}>
      <Head>
        <title>{project.name} | CreateBase</title>
        <meta name="description" content={project.caption} />
      </Head>
      <Game unityContext={unityContext} />
    </div>
  );
};

export default Play;
