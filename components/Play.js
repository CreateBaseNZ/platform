import { useEffect } from "react";
import Link from "next/link";
import useUnity from "/hooks/useUnity";
import Head from "next/head";
import Game from "./Code/Game";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import classes from "./Play.module.scss";

const Play = ({ setLoaded, project }) => {
  const [unityContext, sensorData, gameState, resetScene] = useUnity({
    project: project.query,
    scenePrefix: project.scenePrefix,
    scene: "research",
    setLoaded: setLoaded,
  });

  useEffect(() => {
    return () => setLoaded(false);
  }, []);

  return (
    <div className={classes.play}>
      <Head>
        <title>Play - {project.name} | CreateBase</title>
        <meta name="description" content={project.caption} />
      </Head>
      <Link
        href={{
          pathname: `/${project.query}/project/[step]`,
          query: { step: "research" },
        }}
      >
        <button className={classes.backButton} title="Back to project">
          <ExitToAppIcon />
        </button>
      </Link>
      <Game unityContext={unityContext} />
    </div>
  );
};

export default Play;
