import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import classes from "/styles/ProjectView.module.scss";

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

const steps = [
  { title: "Imagine", icon: "movie" },
  { title: "Define", icon: "biotech" },
  { title: "Research", icon: "travel_explore" },
  { title: "Plan", icon: "design_services" },
  { title: "Create", icon: "smart_toy" },
  { title: "Improve", icon: "auto_graph" },
  { title: "Review", icon: "checklist" },
];

const ProjectView = ({ setLoaded }) => {
  const router = useRouter();
  const [project, setProject] = useState({});
  const [step, setStep] = useState("Imagine");
  const [view, setView] = useState("project");

  useEffect(() => setLoaded(true), []);

  useEffect(() => {
    if (Object.keys(router.query).length) {
      setProject(DUMMY_QUERY[router.query.project]);
      if (router.query.projectView) {
        const subQuery = router.query.projectView[0];
        if (subQuery === "play" || subQuery === "code") {
          setView(subQuery);
        } else {
          setView("project");
          setStep(subQuery[0].toUpperCase() + subQuery.substring(1));
        }
      } else {
        setView("project");
      }
    }
  }, [router.query]);

  return (
    <div className={classes.projectView}>
      <Head>
        <title>
          {view === "project" ? step : view} • {project.name} | CreateBase
        </title>
        <meta name="description" content={project.caption} />
      </Head>
      <div className={classes.tabBar}>
        {steps.map((s, i) => (
          <button
            key={i}
            className={`${classes.tab} ${
              step === s.title ? classes.activeTab : ""
            }`}
            onClick={() =>
              router.push({
                pathname: `/${project.query}/${s.title.toLowerCase()}`,
              })
            }
          >
            <span className="material-icons-outlined">{s.icon}</span>
            {s.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectView;
