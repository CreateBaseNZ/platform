import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import classes from "/styles/View.module.scss";
import Project from "../../components/Project/Project";
import Code from "../../components/Code/Code";
import Play from "../../components/Play";

const DUMMY_QUERY = {
  "send-it": {
    name: "Send It",
    query: "send-it",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non aliquam augue. Nullam nunc purus, iaculis at congue a, varius vel massa. Suspendisse eget pharetra ipsum. Praesent vulputate ipsum laoreet tempor viverra. Curabitur vehicula bibendum facilisis. Duis tincidunt mauris ac sem imperdiet imperdiet.",
    stacked: true,
    scenePrefix: "Project_Jump_0",
    runType: "loop",
  },
  magnebot: {
    name: "MagneBot",
    query: "magnebot",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non aliquam augue. Nullam nunc purus, iaculis at congue a, varius vel massa. Suspendisse eget pharetra ipsum. Praesent vulputate ipsum laoreet tempor viverra. Curabitur vehicula bibendum facilisis. Duis tincidunt mauris ac sem imperdiet imperdiet.",
    stacked: true,
    scenePrefix: "Project_RoboticArm_1",
    runType: "once",
  },
};

const View = ({ setLoaded }) => {
  const router = useRouter();
  const [project, setProject] = useState();
  const [view, setView] = useState();

  useEffect(() => {
    console.log(router.query);
    if (Object.keys(router.query).length) {
      setProject(DUMMY_QUERY[router.query.project]);
      if (router.query.view) {
        setView(router.query.view[0]);
      } else {
        setView("project");
      }
    }
  }, [router.query]);

  useEffect(() => {
    if (view === "project" && router.query.view && router.query.view[1]) {
      console.log(router.query.view);
      document.querySelector(`#${router.query.view[1]}`).scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [view, router.query.view]);

  return (
    <div className={classes.view}>
      {project && view === "project" && (
        <Project setLoaded={setLoaded} project={project} />
      )}
      {project && view === "play" && (
        <Play setLoaded={setLoaded} project={project} />
      )}
      {project && view === "create" && (
        <Code setLoaded={setLoaded} mode="Create" project={project} />
      )}
      {project && view === "improve" && (
        <Code setLoaded={setLoaded} mode="Improve" project={project} />
      )}
    </div>
  );
};

export default View;
