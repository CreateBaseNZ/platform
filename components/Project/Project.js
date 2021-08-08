import { useEffect, useState } from "react";
import Head from "next/head";

import Imagine from "./Imagine";
import Define from "./Define";
import Research from "./Research";
import Plan from "./Plan";
import Create from "./Create";
import Improve from "./Improve";
import Review from "./Review";

import classes from "./project.module.scss";

const Project = ({ setLoaded, project }) => {
  useEffect(() => {
    setLoaded(true);
    return () => setLoaded(false);
  }, []);

  return (
    <div className={classes.project}>
      <Head>
        <title>{project.name} - CreateBase</title>
        <meta name="description" content={project.caption} />
      </Head>
      <Imagine query={project.query} />
      <div className={classes.divider} />
      <Define query={project.query} />
      <div className={classes.divider} />
      <Research query={project.query} />
      <div className={classes.divider} />
      <Plan query={project.query} />
      <div className={classes.divider} />
      <Create query={project.query} />
      <div className={classes.divider} />
      <Improve query={project.query} />
      <div className={classes.divider} />
      <Review />
    </div>
  );
};

export default Project;
