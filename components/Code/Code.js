import { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import useUnity from "/hooks/useUnity";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Game from "./Game";
import Workspace from "./Workspace";

import { ConsoleContextProvider } from "../../store/console-context";

import classes from "./code.module.scss";

const Code = ({ setLoaded, mode, project }) => {
  const [unityContext, sensorData, gameState, resetScene] = useUnity({
    project: project.query,
    scenePrefix: project.scenePrefix,
    scene: mode.toLowerCase(),
    setLoaded: setLoaded,
  });

  useEffect(() => {
    return () => setLoaded(false);
  }, []);

  return (
    <div className={classes.code}>
      <ConsoleContextProvider>
        <Head>
          <title>
            {mode} - {project.name} | CreateBase
          </title>
          <meta name="description" content={project.caption} />
        </Head>
        <div
          className={`${classes.mainWindow} ${
            project.stacked ? classes.stackedView : classes.shelvedView
          }`}
        >
          <Link
            href={{
              pathname: `/${project.query}/project/[step]`,
              query: { step: mode.toLowerCase() },
            }}
          >
            <button className={classes.backButton} title="Back to project">
              <ExitToAppIcon />
            </button>
          </Link>
          <Game unityContext={unityContext} />
          <Workspace
            stacked={project.stacked}
            unityContext={unityContext}
            sensorData={sensorData}
            query={project.query}
          />
        </div>
      </ConsoleContextProvider>
    </div>
  );
};

export default Code;
