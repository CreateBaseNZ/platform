import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import SettingsIcon from "@material-ui/icons/Settings";

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

const Play = () => {
  const router = useRouter();
  const [game, setGame] = useState();
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (router.query.game) {
      console.log(router);
      console.log(router.query.game[0]);
      setGame(DUMMY_QUERY[router.query.game[0]]);
    }
  }, [router.query]);

  const settingsHandler = () => {
    setShowSettings(true);
  };

  return (
    <OverlayScrollbarsComponent className={classes.play}>
      <Head>
        <title>{game ? game.name : "Play"} | CreateBase</title>
        <meta name="description" content={game ? game.caption : ""} />
      </Head>
      <div className={`${classes.mainWindow} ${classes.stackedView}`}>
        <div className={classes.unity}>
          <button className={classes.settingsBtn} onClick={settingsHandler}>
            <SettingsIcon />
          </button>
        </div>
        <div className={classes.workspace}></div>
      </div>
    </OverlayScrollbarsComponent>
  );
};

export default Play;
