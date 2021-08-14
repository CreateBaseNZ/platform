import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import classes from "/styles/projectView.module.scss";
import Project from "../../components/Project/Project";
import Code from "../../components/Code/Code";
import Play from "../../components/Play";
import Boost from "../../components/Minigames/Boost";

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

const ProjectView = ({ setLoaded }) => {
  const router = useRouter();
  const [project, setProject] = useState();
  const [view, setView] = useState();

  useEffect(() => {
    console.log(router.query);
    if (Object.keys(router.query).length) {
      setProject(DUMMY_QUERY[router.query.project]);
      if (router.query.projectView) {
        setView(router.query.projectView[0]);
      } else {
        setView("project");
      }
    }
  }, [router.query]);

  useEffect(() => {
    if (
      view === "project" &&
      router.query.projectView &&
      router.query.projectView[1]
    ) {
      console.log(router.query.projectView);
      document.querySelector(`#${router.query.projectView[1]}`).scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [view, router.query.projectView]);

  return (
    <div className={classes.projectView}>
      {project && view === "project" && (
        <Project project={project} setLoaded={setLoaded} />
      )}
      {project && view === "play" && (
        <Play project={project} setLoaded={setLoaded} />
      )}
      {project && view === "create" && (
        <Code mode="Create" project={project} setLoaded={setLoaded} />
      )}
      {project && view === "improve" && (
        <Code mode="Improve" project={project} setLoaded={setLoaded} />
      )}
      {project && view === "boost" && (
        <Boost mode="Comparison" query={project.query} setLoaded={setLoaded} />
      )}
    </div>
  );
};

export default ProjectView;
