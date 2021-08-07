import { useEffect, useState } from "react";
import Head from "next/head";

import Imagine from "./Imagine";
import Define from "./Define";
import Research from "./Research";
import Plan from "./Plan";
import Create from "./Create";
import Improve from "./Improve";
import Review from "./Review";

import classes from "./overview.module.scss";

const Overview = ({ setLoaded, project }) => {
  useEffect(() => {
    setLoaded(true);
    return () => setLoaded(false);
  }, []);

  return (
    <div className={classes.overview}>
      <Head>
        <title>Overview - {project.name} - CreateBase</title>
        <meta name="description" content={project.caption} />
      </Head>
      <Imagine query={project.query} />
      <div className={classes.divider} />
      {project.query !== "magnebot" && <Define query={project.query} />}
      <div className={classes.divider} />
      <Research query={project.query} />
      <div className={classes.divider} />
      {project.query !== "magnebot" && <Plan query={project.query} />}
      <div className={classes.divider} />
      <Create query={project.query} />
      <div className={classes.divider} />
      <Improve query={project.query} />
      <div className={classes.divider} />
      {project.query !== "magnebot" && <Review />}
    </div>
  );
};

export default Overview;
