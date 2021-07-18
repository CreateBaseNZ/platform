import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import useUnity from "/hooks/useUnity";

import Game from "/components/Game";
import Workspace from "/components/Workspace";

import { ConsoleContextProvider } from "../../store/console-context";

import classes from "/styles/Create.module.scss";

const DUMMY_QUERY = {
  "run-it-down": {
    name: "Run It Down",
    src: "/project.png",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non aliquam augue. Nullam nunc purus, iaculis at congue a, varius vel massa. Suspendisse eget pharetra ipsum. Praesent vulputate ipsum laoreet tempor viverra. Curabitur vehicula bibendum facilisis. Duis tincidunt mauris ac sem imperdiet imperdiet.",
    stacked: true,
  },
};

const Create = () => {
  const router = useRouter();
  const [project, setProject] = useState({ stacked: true });
  const [unityContext, sensorData, gameState, resetScene] = useUnity("create");

  useEffect(() => {
    if (router.query.project) {
      setProject(DUMMY_QUERY[router.query.project[0]]);
    }
  }, [router.query]);

  return (
    <div className={classes.create}>
      <ConsoleContextProvider>
        <Head>
          <title>{project ? project.name : "Create"} | CreateBase</title>
          <meta name="description" content={project ? project.caption : ""} />
        </Head>
        <div
          className={`${classes.mainWindow} ${
            project.stacked ? classes.stackedView : classes.shelvedView
          }`}
        >
          <Game unityContext={unityContext} />
          <Workspace
            stacked={project.stacked}
            unityContext={unityContext}
            sensorData={sensorData}
          />
        </div>
        <div id="compileBtnPortal"></div>
      </ConsoleContextProvider>
    </div>
  );
};

export default Create;
