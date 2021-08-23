import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { ColourLogo } from "/components/UI/Icons";
import BrowseThumb from "../components/BrowseThumb";
import sendItData from "../data/send-it-data";
import magnebotData from "../data/magnebot-data";

// Session management functions
import { useSession, signOut, getSession } from "next-auth/client";

// Backend communication
import axios from "axios";

import classes from "/styles/Browse.module.scss";
import { useRouter } from "next/router";

const allData = [magnebotData, sendItData];

const Browse = ({ setLoaded }) => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Accessing User Session
  const [session, loading] = useSession();

  console.log("browse rerendered");

  useEffect(() => {
    setLoaded(true);
    return () => setLoaded(false);
  }, []);

  useEffect(async () => {
    // EXAMPLE: Fetch the identification of the authenticated user
    getSession().then((session) => {
      // Perform some actions if necessary
      console.log(session);
    });
    // EXAMPLE: Create data
    // const input = {
    //   test: "Hello World",
    //   test2: "Hello World 2",
    // }; // Object containing the properties, with values, we want to save
    // const date = new Date().toString();
    // let data;
    // try {
    //   data = (await axios.post("/api/user/data/create", { input, date }))[
    //     "data"
    //   ];
    // } catch (error) {
    //   data = { status: "error", content: error };
    // }
    // console.log(data);

    // EXAMPLE: Read data
    // const input = ["test", "test2"]; // Array of the properties which values we want to retrieve
    // let data;
    // try {
    //   data = (await axios.post("/api/user/data/read", { input }))["data"];
    // } catch (error) {
    //   data = { status: "error", content: error };
    // }
    // console.log(data);

    // EXAMPLE: Update data
    // const input = {
    //   test: "Hello World 3",
    //   test2: "Hello World 4",
    // };
    // const date = new Date().toString();
    // let data;
    // try {
    //   data = (await axios.post("/api/user/data/update", { input, date }))[
    //     "data"
    //   ];
    // } catch (error) {
    //   data = { status: "error", content: error };
    // }
    // console.log(data);

    // EXAMPLE: Delete data
    // const input = ["test", "test2"]; // Array of the properties which values we want to retrieve
    // const date = new Date().toString();
    // let data;
    // try {
    //   data = (await axios.post("/api/user/data/delete", { input, date }))[
    //     "data"
    //   ];
    // } catch (error) {
    //   data = { status: "error", content: error };
    // }
    // console.log(data);

    // EXAMPLE: Create a license
    // const input = {
    //   username: "student1",
    //   password: "student1",
    //   date: new Date().toString(),
    //   status: "free", // Status of the license can either be free, lite, pro
    //   access: { learner: true }, // Access can be admin, educator and learner
    // };
    // let data;
    // try {
    //   data = (await axios.post("/api/organisation/license/add", input))["data"];
    // } catch (error) {
    //   data = { status: "error", content: error };
    // }
    // console.log(data);
  }, []);

  if (loading) {
    return null;
  }

  const thumbnailHandler = (index) => {
    setVideoLoaded(false);
    setActiveIndex(index);
  };

  const logoutHandler = () => {
    signOut();
  };

  return (
    <div className={classes.browse}>
      <Head>
        <title>Browse | CreateBase</title>
        <meta name="description" content="Browse CreateBase projects" />
      </Head>
      <div className={classes.nav}>
        <ColourLogo layout="fill" objectFit="contain" quality={100} />
        <div className={classes.navAuth}>
          {session ? (
            <button onClick={logoutHandler} className={classes.signOut}>
              Sign out
            </button>
          ) : (
            <>
              <Link href="/auth/signup">
                <button className={classes.signUp}>Sign up</button>
              </Link>
              <Link href="/auth/login">
                <button className={classes.logIn}>Log in</button>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className={classes.main}>
        <div className={classes.content}>
          <h2>Select a project</h2>
          <h1>{allData[activeIndex].name}</h1>
          <p>{allData[activeIndex].caption}</p>
          <Link href={`/${allData[activeIndex].query}`}>
            <button className={classes.continue}>
              Continue
              <span className="material-icons-outlined">play_arrow</span>
            </button>
          </Link>
        </div>
        <div className={classes.vidContainer}>
          <video
            src={`/${allData[activeIndex].query}/vid/situation.mp4`}
            controls
            className={`${classes.vid} ${videoLoaded ? classes.vidLoaded : ""}`}
            onCanPlay={() => setVideoLoaded(true)}
          >
            <source type="video/mp4" />
          </video>
        </div>
      </div>
      <div className={classes.allProjects}>
        {allData.map((project, index) => (
          <BrowseThumb
            key={index}
            activeIndex={activeIndex}
            index={index}
            query={project.query}
            name={project.name}
            thumbnailHandler={thumbnailHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Browse;
