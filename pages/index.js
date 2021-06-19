import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import WhiteLogo, {
  FBIcon,
  IGIcon,
  TwitterIcon,
  YTIcon,
} from "/components/UI/Icons";

import classes from "/styles/Index.module.scss";

const Index = () => {
  const [showHelper, setShowHelper] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const helperClickHandler = () => {
    setShowHelper((state) => !state);
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
          objectFit="contain"
          quality={100}
          objectPosition={"75% 100%"}
          alt="Landing image"
        />
      </div>
      <nav className={classes.nav}>
        <div className={classes.logo}>
          <WhiteLogo layout="fill" objectFit="contain" quality={100} />
        </div>
        <div className={classes.socials}>
          <FBIcon height={28} width={28} />
          <IGIcon height={28} width={28} />
          <TwitterIcon height={28} width={28} />
          <YTIcon height={28} width={28} />
        </div>
      </nav>
      <div className={classes.container}>
        <h2 className={classes.h2}>Welcome to</h2>
        <h1 className={classes.h1}>Open Alpha</h1>
        <Link href="/explore">
          <button className={classes.getStarted}>Get Started</button>
        </Link>
      </div>
      <div className={classes.help}>
        <button
          className={showHelper && classes.active}
          onClick={helperClickHandler}
        >
          <span className={classes.what}>What's this?</span>
          <CloseRoundedIcon style={{ fontSize: 16 }} />
        </button>
        <p className={!showHelper && classes.hide}>
          At CreateBase, we want to change the world by enabling the next
          generation of creators. That's why we're developing a project-centric
          educational platform to give people the skills, tools, and confidence
          to unleash their inner technology creator.
          <br />
          <br />
          You're about to experience a tiny portion of our final platform,
          something that we call a{" "}
          <span className={classes.italic}>Project</span>. You'll be introduced
          to a situation and will need to apply skills and problem-solving to
          build a working solution. Your progress will be saved as you move
          through the Project, so feel free to take your time and, most
          importantly, have fun along the way.
          <br />
          <br />
          💜 Team CreateBase
        </p>
      </div>
    </div>
  );
};

export default Index;
