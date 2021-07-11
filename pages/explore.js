import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { ColourLogo } from "/components/UI/Icons";
import GreenButton from "/components/UI/GreenButton";

import classes from "/styles/Explore.module.scss";

const DUMMY_GAMES = [
  {
    name: "Run It Down",
    routerQuery: "run-it-down",
    src: "/game.png",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non aliquam augue. Nullam nunc purus, iaculis at congue a, varius vel massa. Suspendisse eget pharetra ipsum. Praesent vulputate ipsum laoreet tempor viverra. Curabitur vehicula bibendum facilisis. Duis tincidunt mauris ac sem imperdiet imperdiet.",
  },
  {
    name: "Yep jump",
    routerQuery: "jump",
    src: "/game.png",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non aliquam augue. Nullam nunc purus, iaculis at congue a, varius vel massa. Suspendisse eget pharetra ipsum. Praesent vulputate ipsum laoreet tempor viverra. Curabitur vehicula bibendum facilisis. Duis tincidunt mauris ac sem imperdiet imperdiet.",
  },
  {
    name: "wah wah wah",
    routerQuery: "jump",
    src: "/game.png",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non aliquam augue. Nullam nunc purus, iaculis at congue a, varius vel massa. Suspendisse eget pharetra ipsum. Praesent vulputate ipsum laoreet tempor viverra. Curabitur vehicula bibendum facilisis. Duis tincidunt mauris ac sem imperdiet imperdiet.",
  },
];

const Explore = () => {
  const [activeGame, setActiveGame] = useState(0);

  const thumbnailHandler = (index) => {
    setActiveGame(index);
  };

  return (
    <div className={classes.explore}>
      <Head>
        <title>Explore | CreateBase</title>
        <meta name="description" content="Explore CreateBase games" />
      </Head>
      <div className={classes.logo}>
        <ColourLogo layout="fill" objectFit="contain" quality={100} />
      </div>
      <h1 className={classes.h1}>Select a game</h1>
      <div className={classes.selectedGame}>
        <div className={classes.content}>
          <h2>{DUMMY_GAMES[activeGame].name}</h2>
          <p>{DUMMY_GAMES[activeGame].caption}</p>
          <Link
            href={{
              pathname: "/play/[game]",
              query: { game: DUMMY_GAMES[activeGame].routerQuery },
            }}
          >
            <div>
              <GreenButton caption="Start!" />
            </div>
          </Link>
        </div>
        <div className={classes.coverImage}>
          <Image
            src={DUMMY_GAMES[activeGame].src}
            layout="fill"
            objectFit="cover"
            alt={DUMMY_GAMES[activeGame].name}
          />
        </div>
      </div>
      <div className={classes.allGames}>
        {DUMMY_GAMES.map((game, index) => (
          <div
            key={game.name}
            className={`${classes.gameThumbnailWrapper} ${
              activeGame === index ? classes.selectedThumbnail : ""
            }`}
          >
            <div
              className={classes.gameThumbnail}
              onClick={() => thumbnailHandler(index)}
            >
              <Image
                src={game.src}
                layout="fill"
                objectFit="cover"
                alt={game.name}
              />
              <p>
                <span className="span">{game.name}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
