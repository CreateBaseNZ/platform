import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import BrowseThumb from "../components/BrowseThumb";
import sendItData from "../data/send-it-data";
import magnebotData from "../data/magnebot-data";
import lineFollowingData from "../data/line-following-data";
import Header from "../components/Header";

import { useSession } from "next-auth/client";

// Backend communication
import axios from "axios";

import classes from "/styles/Browse.module.scss";
import { PrimaryButton } from "../components/UI/Buttons";

const allData = [magnebotData, sendItData];

const Browse = ({ setLoaded }) => {
  const [session, loading] = useSession();
  const [user, setUser] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  console.log("browse rerendered");

  useEffect(() => {
    setLoaded(true);
    return () => setLoaded(false);
  }, []);

  useEffect(async () => {
    if (session) {
      let data;
      try {
        data = (
          await axios.post("/api/user/data/read", { input: ["displayName"] })
        )["data"];
      } catch (error) {
        data = { status: "error", content: error };
      }
      console.log(data);
      if (data.status === "error") {
        console.log("error"); // TODO handle error
      }
      setUser({
        type: session.user.access,
        org: session.user.organisation,
        name: data.content.displayName,
      });
    }
  }, [session]);

  if (loading) {
    return null;
  }

  const thumbnailHandler = (index) => {
    setVideoLoaded(false);
    setActiveIndex(index);
  };

  return (
    <div className={classes.browse}>
      <Head>
        <title>Browse | CreateBase</title>
        <meta name="description" content="Browse CreateBase projects" />
      </Head>
      <Header
        session={session}
        type={user.type}
        org={user.org}
        name={user.name}
      />
      <div className={classes.main}>
        <div className={classes.content}>
          <h2>Select a project</h2>
          <h1>{allData[activeIndex].name}</h1>
          <p>{allData[activeIndex].caption}</p>
          <div className={classes.btnContainer}>
            {session && user && user.type !== "learner" && (
              <Link href={`/${allData[activeIndex].query}`}>
                <div>
                  <PrimaryButton
                    className={classes.lesson}
                    mainLabel="Lesson Plan"
                    iconLeft={
                      <i className="material-icons-outlined">history_edu</i>
                    }
                  />
                </div>
              </Link>
            )}
            <Link href={`/${allData[activeIndex].query}`}>
              <div>
                <PrimaryButton
                  className={classes.continue}
                  mainLabel="Continue"
                  iconRight={
                    <i className="material-icons-outlined">play_arrow</i>
                  }
                />
              </div>
            </Link>
          </div>
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
