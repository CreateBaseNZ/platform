import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import useUnity from "/hooks/useUnity";
import LoadingScreen from "../../components/UI/Loading";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Game from "/components/Game";
import Workspace from "/components/Workspace";

import { ConsoleContextProvider } from "../../store/console-context";

import classes from "/styles/Create.module.scss";

const DUMMY_QUERY = {
  "send-it": {
    name: "Send It",
    src: "/send_it.png",
    query: "send-it",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non aliquam augue. Nullam nunc purus, iaculis at congue a, varius vel massa. Suspendisse eget pharetra ipsum. Praesent vulputate ipsum laoreet tempor viverra. Curabitur vehicula bibendum facilisis. Duis tincidunt mauris ac sem imperdiet imperdiet.",
    stacked: true,
  },
};

const Create = ({ setLoaded }) => {
  const router = useRouter();
  const [project, setProject] = useState({ stacked: true });
  const [unityContext, sensorData, gameState, resetScene] = useUnity({
    scene: "create",
  });

  useEffect(() => {
    console.log(router.query);
    if (router.query.project) {
      setProject(DUMMY_QUERY[router.query.project[0]]);
    }
  }, [router.query]);

  useEffect(() => {
    if (gameState) {
      setTimeout(() => {
        setLoaded(true);
      }, [1000]);
    }
  }, [gameState]);

  return (
    <div className={classes.create}>
      <ConsoleContextProvider>
        <Head>
          <title>
            Create - {project ? project.name : "Create"} | CreateBase
          </title>
          <meta name="description" content={project ? project.caption : ""} />
        </Head>
        <div
          className={`${classes.mainWindow} ${
            project.stacked ? classes.stackedView : classes.shelvedView
          }`}
        >
          <Link
            href={{
              pathname: "/overview/[project]",
              query: { project: project.query },
              hash: "create",
            }}
          >
            <button className={classes.backButton} title="Back to overview">
              <ExitToAppIcon />
            </button>
          </Link>
          <Game unityContext={unityContext} />
          <Workspace
            stacked={project.stacked}
            unityContext={unityContext}
            sensorData={sensorData}
          />
        </div>
      </ConsoleContextProvider>
    </div>
  );
};

export default Create;
