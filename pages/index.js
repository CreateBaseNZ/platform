import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import WhiteLogo, {
  FBIcon,
  IGIcon,
  TwitterIcon,
  YTIcon,
} from "/components/UI/Icons";

import classes from "/styles/Index.module.scss";

const Index = ({ setLoaded }) => {
  const [session, loading] = useSession();
  const [showHelper, setShowHelper] = useState(false);

  useEffect(() => setLoaded(true), []);

  const helperClickHandler = () => {
    setShowHelper((state) => !state);
  };

  if (loading) return null;

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
        {session ? (
          <div className={classes.btnContainer}>
            <Link href="/browse">
              <button className={classes.loggedIn}>Continue as Lorem</button>
            </Link>
          </div>
        ) : (
          <div className={classes.btnContainer}>
            <Link href="/auth/signup">
              <button className={classes.signUp}>Sign Up</button>
            </Link>
            <Link href="/auth/login">
              <button className={classes.logIn}>
                Log In<i className="material-icons-outlined">login</i>
              </button>
            </Link>
            <Link href="/browse">
              <button className={classes.guest}>Continue as guest</button>
            </Link>
          </div>
        )}
      </div>
      <div className={classes.help}>
        <button
          className={showHelper ? classes.active : ""}
          onClick={helperClickHandler}
        >
          What's this?
          <i className="material-icons-outlined">close</i>
        </button>
        <p className={showHelper ? "" : classes.hide}>
          At CreateBase, we want to change the world by enabling the next
          generation of creators. That's why we're developing a project-centric
          educational platform to give people the skills, tools, and confidence
          to unleash their inner technology creator.
          <br />
          <br />
          You're about to experience a tiny portion of our final platform,
          something that we call a
          <span className={`${classes.italic} span`}>Project</span>. You'll be
          introduced to a situation and will need to apply skills and
          problem-solving to build a working solution. Your progress will be
          saved as you move through the Project, so feel free to take your time
          and, most importantly, have fun along the way.
          <br />
          <br />
          💜 Team CreateBase
        </p>
      </div>
    </div>
  );
};

export default Index;
