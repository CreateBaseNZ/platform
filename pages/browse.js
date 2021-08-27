import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import BrowseThumb from "../components/BrowseThumb";
import sendItData from "../data/send-it-data";
import magnebotData from "../data/magnebot-data";
import Header from "../components/Header";

import { useSession, getSession } from "next-auth/client";

// Backend communication
import axios from "axios";

import classes from "/styles/Browse.module.scss";

const allData = [magnebotData, sendItData];

const Browse = ({ setLoaded }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [user, setUser] = useState({});

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
		// EXAMPLE: Change username as an admin
		// const input = { username: "louislin0", newUsername: "louislin1", date: new Date().toString() };
		// let data;
		// try {
		// 	data = (await axios.post("/api/organisation/license/change-username-admin", input))["data"];
		// } catch (error) {
		// 	data = { status: "error", content: error };
		// }
		// console.log(data);

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
		// EXAMPLE: Change password as an admin
		// const input = { username: "louislin0", newPassword: "f", date: new Date().toString() };
		// let data;
		// try {
		// 	data = (await axios.post("/api/organisation/license/change-password-admin", input))["data"];
		// } catch (error) {
		// 	data = { status: "error", content: error };
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
					<video src={`/${DUMMY_PROJECTS[activeIndex].query}/vid/situation.mp4`} controls className={classes.vid}>
						<source type="video/mp4" />
					</video>
				</div>
			</div>
			<div className={classes.allProjects}>
				{DUMMY_PROJECTS.map((project, index) => (
					<Thumbnail key={index} activeIndex={activeIndex} index={index} query={project.query} name={project.name} thumbnailHandler={thumbnailHandler} />
				))}
			</div>
		</div>
	);
};

export default Browse;
