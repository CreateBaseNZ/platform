import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import useUnity from "/hooks/useUnity";

import Game from "/components/Game";
import Workspace from "/components/Workspace";

import classes from "/styles/Play.module.scss";

const DUMMY_QUERY = {
  RunItDown: {
    name: "Run It Down",
    routerQuery: "run-it-down",
    src: "/game.png",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non aliquam augue. Nullam nunc purus, iaculis at congue a, varius vel massa. Suspendisse eget pharetra ipsum. Praesent vulputate ipsum laoreet tempor viverra. Curabitur vehicula bibendum facilisis. Duis tincidunt mauris ac sem imperdiet imperdiet.",
    stacked: true,
  },
};

const urlToQueryName = (str) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

const Play = () => {
  const router = useRouter();
  const [game, setGame] = useState({ stacked: true });
  const [unityContext, sensorData, gameState, resetScene] = useUnity();

  useEffect(() => {
    if (router.query.game) {
      setGame(DUMMY_QUERY[urlToQueryName(router.query.game[0])]);
    }
  }, [router.query]);

  return (
    <div className={classes.play}>
      <Head>
        <title>{game ? game.name : "Play"} | CreateBase</title>
        <meta name="description" content={game ? game.caption : ""} />
      </Head>
      <div
        className={`${classes.mainWindow} ${
          game.stacked ? classes.stackedView : classes.shelvedView
        }`}
      >
        <Game unityContext={unityContext} />
        <Workspace
          stacked={game.stacked}
          unityContext={unityContext}
          sensorData={sensorData}
        />
      </div>
    </div>
  );
};

export default Play;
