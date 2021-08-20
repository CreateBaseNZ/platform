import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { ColourLogo } from "/components/UI/Icons";
import GreenButton from "/components/UI/GreenButton";
import Thumbnail from "../components/Thumbnail";

// Session management functions
import { useSession, signOut, getSession } from "next-auth/client";

// Backend communication
import axios from "axios";

import classes from "/styles/Browse.module.scss";

const DUMMY_PROJECTS = [
  {
    name: "Send It",
    query: "send-it",
    caption:
      'In this project, users will automate a jumping game by creating a simple "AI" that is able to exceed human capabilities and achieve as high of a score as possible. This AI will be controlling a robot with the task of delivering a package as fast as possible, automatically jumping over any obstacles that get in its way.',
  },
  {
    name: "MagneBot",
    query: "magnebot",
    caption:
      "In this project, users will control the MagneBot robotic arm using logical flow-based programming to clean up a recycling facility. Users will learn the basics of the Flow programming language and how to convert their thinking into instructions for the robot. Along the way, they will also gain an understanding of recycling and how robotic systems can be used to carry out tasks traditionally performed by humans.",
  },
];

const Browse = ({ setLoaded }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Accessing User Session
  const [session, loading] = useSession();

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

    setLoaded(true);
    return () => setLoaded(false);
  }, []);

  const thumbnailHandler = (index) => {
    setActiveIndex(index);
  };

  // EXAMPLE: Handling sign out requests
  function logoutHandler() {
    signOut();
  }

  console.log(`/${DUMMY_PROJECTS[activeIndex].query}/vid/situation.mp4`);

  return (
    <div className={classes.browse}>
      <Head>
        <title>Browse | CreateBase</title>
        <meta name="description" content="Browse CreateBase projects" />
      </Head>
      <div className={classes.logo}>
        <ColourLogo layout="fill" objectFit="contain" quality={100} />
      </div>
      {
        // EXAMPLE: Example code for managing the div based on authentication
        !session && !loading && <Link href="/auth">Login</Link>
      }
      {
        // EXAMPLE: Example code for managing the div based on authentication
        session && <button onClick={logoutHandler}>Logout</button>
      }
      <h1 className={classes.h1}>Select a project</h1>
      <div className={classes.selectedProject}>
        <div className={classes.content}>
          <h2>{DUMMY_PROJECTS[activeIndex].name}</h2>
          <p>{DUMMY_PROJECTS[activeIndex].caption}</p>
          <Link href={`/${DUMMY_PROJECTS[activeIndex].query}`}>
            <div>
              <GreenButton caption="Continue" />
            </div>
          </Link>
        </div>
        <div className={classes.coverVid}>
          <video
            src={`/${DUMMY_PROJECTS[activeIndex].query}/vid/situation.mp4`}
            controls
            className={classes.vid}
          >
            <source type="video/mp4" />
          </video>
        </div>
      </div>
      <div className={classes.allProjects}>
        {DUMMY_PROJECTS.map((project, index) => (
          <Thumbnail
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
