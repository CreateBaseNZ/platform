import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Imagine from "../../components/Project/Imagine";
import Define from "../../components/Project/Define";
import Code from "../../components/Code/Code";
import Play from "../../components/Play";

import classes from "/styles/ProjectView.module.scss";
import { sendItData } from "../../data/send-it-data";
import { lineFollowingData } from "../../data/line-following-data";
import { magnebotData } from "../../data/magnetbot-data";
import Research from "../../components/Project/Research";

// const DUMMY_QUERY = {
//   "send-it": {
//     name: "Send It",
//     query: "send-it",
//     caption:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non aliquam augue. Nullam nunc purus, iaculis at congue a, varius vel massa. Suspendisse eget pharetra ipsum. Praesent vulputate ipsum laoreet tempor viverra. Curabitur vehicula bibendum facilisis. Duis tincidunt mauris ac sem imperdiet imperdiet.",
//     stacked: true,
//     scenePrefix: "Project_Jump_0",
//     runType: "loop",
//   },
//   magnebot: {
//     name: "MagneBot",
//     query: "magnebot",
//     caption:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non aliquam augue. Nullam nunc purus, iaculis at congue a, varius vel massa. Suspendisse eget pharetra ipsum. Praesent vulputate ipsum laoreet tempor viverra. Curabitur vehicula bibendum facilisis. Duis tincidunt mauris ac sem imperdiet imperdiet.",
//     stacked: true,
//     scenePrefix: "Project_RoboticArm_1",
//     runType: "once",
//   },
// };

const get_data = (query) => {
  switch (query) {
    case "send-it":
      return sendItData;
    case "line-following":
      return lineFollowingData;
    case "magnebot":
      return magnebotData;
  }
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
  const [data, setData] = useState({});
  const [step, setStep] = useState("Imagine");
  const [view, setView] = useState("Project");

  useEffect(() => setLoaded(true), []);

  useEffect(() => {
    if (Object.keys(router.query).length) {
      setData(get_data(router.query.project));
      if (router.query.projectView) {
        const subQuery = router.query.projectView[0];
        if (subQuery === "play") {
          setView(subQuery[0].toUpperCase() + subQuery.substring(1));
          setLoaded(false);
        } else if (subQuery === "code") {
          setView(subQuery[0].toUpperCase() + subQuery.substring(1));
          setStep(
            router.query.projectView[1][0].toUpperCase() +
              router.query.projectView[1].substring(1)
          );
          setLoaded(false);
        } else {
          setView("Project");
          setStep(subQuery[0].toUpperCase() + subQuery.substring(1));
        }
      } else {
        setView("Project");
      }
    }
  }, [router.query]);

  return (
    <div className={classes.projectView}>
      <Head>
        <title>
          {view === "Project" ? step : view} • {data.name} | CreateBase
        </title>
        <meta name="description" content={data.caption} />
      </Head>
      {view === "Project" && (
        <>
          <div className={classes.tabContainer}>
            {steps.map((s, i) => (
              <button
                key={i}
                className={`${classes.tabWrapper} ${
                  step === s.title ? classes.activeTab : ""
                }`}
                onClick={() =>
                  router.push({
                    pathname: `/${data.query}/${s.title.toLowerCase()}`,
                  })
                }
              >
                <div className={classes.tab}>
                  <span className="material-icons-outlined">{s.icon}</span>
                  {s.title}
                </div>
              </button>
            ))}
          </div>
          <div className={classes.viewContainer}>
            {step === "Imagine" && (
              <Imagine name={data.name} query={data.query} />
            )}
            {step === "Define" && (
              <Define
                query={data.query}
                data={data.define}
                caption={data.defineCaption}
              />
            )}
            {step === "Research" && (
              <Research query={data.query} data={data.research} />
            )}
          </div>
        </>
      )}
      {view === "Code" && (step === "Create" || step === "Improve") && (
        <Code setLoaded={setLoaded} mode={step} project={data} />
      )}
      {view === "Play" && <Play setLoaded={setLoaded} project={data} />}
    </div>
  );
};

export default ProjectView;
