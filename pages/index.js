import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import WhiteLogo from "/components/UI/WhiteLogo";

import classes from "/styles/Index.module.scss";

const Index = () => {
  const [showHelper, setShowhelper] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const helperClickHandler = () => {
    setShowhelper((state) => !state);
  };

  return (
    <div className={classes.index}>
      <Head>
        <title>Welcome | CreateBase</title>
        <meta
          name="description"
          content="Unleash your inner creator. CreateBase."
        />
      </Head>
      <div className={classes.bg}>
        <Image
          src="/landing.png"
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="Landing image"
        />
      </div>
      <div className={classes.container}>
        <h1 className={`${classes.h1} ${pageLoaded ? classes.loaded : ""}`}>
          <span>D</span>
          <span>E</span>
          <span>M</span>
          <span>O</span>
        </h1>
        <div style={{ position: "relative", width: "650px", height: "125px" }}>
          <WhiteLogo layout="fill" objectFit="contain" quality={100} />
        </div>
        <Link href="/menu">
          <a className={classes.btn}>
            <span>Start</span>
            <PlayArrowRoundedIcon style={{ fontSize: "24" }} />
            <div className={classes.liquid}></div>
          </a>
        </Link>
      </div>
      <div className={classes.help}>
        <button onClick={helperClickHandler}>
          <span
            className={`${classes.what} ${showHelper ? classes.moveUp : ""}`}
          >
            What's this?
          </span>
          <span className={classes.hide}>
            <CloseRoundedIcon style={{ fontSize: 16 }} /> Hide
          </span>
        </button>
        <p className={showHelper ? "" : classes.hide}>
          At CreateBase, we want to change the world by enabling the next
          generation of creators. That's why we're developing a project-centric
          educational platform to give people the skills, tools, and confidence
          to unleash their inner technology creator.
          <br />
          <br />
          You're about to experience a tiny portion of our final platform,
          something that we call a <i>Project</i>. You'll be introduced to a
          situation and will need to apply skills and problem-solving to build a
          working solution. Your progress will be saved as you move through the
          Project, so feel free to take your time and, most importantly, have
          fun along the way.
          <br />
          <br />
          💜 Team CreateBase
        </p>
      </div>
    </div>
  );
};

export default Index;
