import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import classes from "/styles/View.module.scss";
import Overview from "../../components/Overview/Overview";
import Code from "../../components/Code/Code";

const DUMMY_QUERY = {
  "send-it": {
    name: "Send It",
    query: "send-it",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non aliquam augue. Nullam nunc purus, iaculis at congue a, varius vel massa. Suspendisse eget pharetra ipsum. Praesent vulputate ipsum laoreet tempor viverra. Curabitur vehicula bibendum facilisis. Duis tincidunt mauris ac sem imperdiet imperdiet.",
    stacked: true,
  },
  her0: {
    name: "H.E.R.0",
    query: "her0",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non aliquam augue. Nullam nunc purus, iaculis at congue a, varius vel massa. Suspendisse eget pharetra ipsum. Praesent vulputate ipsum laoreet tempor viverra. Curabitur vehicula bibendum facilisis. Duis tincidunt mauris ac sem imperdiet imperdiet.",
    stacked: true,
  },
};

const View = ({ setLoaded }) => {
  const router = useRouter();
  const [project, setProject] = useState();
  const [view, setView] = useState();

  console.log(project);
  console.log(view);

  useEffect(() => {
    if (Object.keys(router.query).length) {
      setProject(DUMMY_QUERY[router.query.project]);
      setView(router.query.view[0]);
    }
  }, [router.query]);

  useEffect(() => {
    if (view === "overview" && router.query.view[1]) {
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
      {project && view === "overview" && (
        <Overview setLoaded={setLoaded} project={project} />
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
