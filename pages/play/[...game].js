import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import useUnity from "/hooks/useUnity";

import Settings from "/components/Settings";
import Game from "/components/Game";
import Workspace from "/components/Workspace";
import Aside from "/components/Aside";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import classes from "/styles/Play.module.scss";

const DUMMY_QUERY = {
  jump: {
    name: "Yep Jump",
    routerQuery: "jump",
    src: "/game.png",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non aliquam augue. Nullam nunc purus, iaculis at congue a, varius vel massa. Suspendisse eget pharetra ipsum. Praesent vulputate ipsum laoreet tempor viverra. Curabitur vehicula bibendum facilisis. Duis tincidunt mauris ac sem imperdiet imperdiet.",
  },
};

const defaultSettings = {
  showMenu: false,
  stacked: true,
};

const Play = () => {
  const router = useRouter();
  const [game, setGame] = useState();
  const [settings, setSettings] = useState(defaultSettings);
  const [unityContext, sensorData, gameState, resetScene] = useUnity();

  useEffect(() => {
    if (router.query.game) {
      console.log(router);
      console.log(router.query.game[0]);
      setGame(DUMMY_QUERY[router.query.game[0]]);
    }
  }, [router.query]);

  return (
    <OverlayScrollbarsComponent className={classes.play}>
      <Head>
        <title>{game ? game.name : "Play"} | CreateBase</title>
        <meta name="description" content={game ? game.caption : ""} />
      </Head>
      <div
        className={`${classes.mainWindow} ${
          settings.stacked ? classes.stackedView : classes.shelvedView
        }`}
      >
        <Game unityContext={unityContext} setSettings={setSettings} />
        <Workspace />
      </div>
      <Settings settings={settings} setSettings={setSettings} />
    </OverlayScrollbarsComponent>
  );
};

export default Play;
