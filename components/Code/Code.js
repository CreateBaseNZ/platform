import { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import useUnity from "/hooks/useUnity";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Game from "./Game";
import Workspace from "./Workspace";

import { ConsoleContextProvider } from "../../store/console-context";

import classes from "/styles/Create.module.scss";

const Code = ({ setLoaded, mode, project }) => {
  const [unityContext, sensorData, gameState, resetScene] = useUnity({
    scene: mode.toLowerCase(),
  });

  useEffect(() => {
    if (gameState) {
      setTimeout(() => {
        setLoaded(true);
      }, [1000]);
    }
  }, [gameState]);

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
              pathname: `/${project.query}/overview/[step]`,
              query: { step: mode },
              hash: mode.toLowerCase(),
            }}
          >
            <button className={classes.backButton} title="Back to overview">
              <ExitToAppIcon />
            </button>
          </Link>
          <Game unityContext={unityContext} />
          <Workspace
            stacked={true} // TODO future feature
            unityContext={unityContext}
            sensorData={sensorData}
          />
        </div>
      </ConsoleContextProvider>
    </div>
  );
};

export default Code;
