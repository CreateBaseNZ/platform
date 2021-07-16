import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  HintModule,
  InfoModule,
  SneaPeekModule,
  TutorialModule,
} from "../../components/Modules";

import urlToQueryName from "../../utils/urlToQueryName";

import classes from "/styles/Overview.module.scss";

const DUMMY_QUERY = {
  RunItDown: {
    name: "Run It Down",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non aliquam augue. Nullam nunc purus, iaculis at congue a, varius vel massa. Suspendisse eget pharetra ipsum. Praesent vulputate ipsum laoreet tempor viverra. Curabitur vehicula bibendum facilisis. Duis tincidunt mauris ac sem imperdiet imperdiet.",
    stacked: true,
  },
};

const Overview = (props) => {
  const router = useRouter();
  const [project, setProject] = useState();

  useEffect(() => {
    if (router.query.project) {
      setProject(DUMMY_QUERY[urlToQueryName(router.query.project[0])]);
    }
  }, [router.query]);

  return (
    <div className={classes.overview}>
      <Head>
        <title>{project ? project.name : "Create"} | CreateBase</title>
        <meta name="description" content={project ? project.caption : ""} />
      </Head>
      <section>
        <h2>Imagine</h2>
      </section>
      <div className={classes.divider} />
      <section>
        <h2>Define</h2>
      </section>
      <div className={classes.divider} />
      <section>
        <h2>Research</h2>
        <div className={classes.moduleContainer}>
          <InfoModule>
            Rewatch the <span>Situation</span> Video
          </InfoModule>
          <TutorialModule>
            What is <span>Flow</span> Programming?
          </TutorialModule>
          <TutorialModule>
            Introduction to <span>Sensing</span> Blocks
          </TutorialModule>
          <HintModule>
            <span>Tips</span> &amp; <span>Tricks</span>
          </HintModule>
          <SneaPeekModule>
            Give it a <span>Go</span>
          </SneaPeekModule>
        </div>
        <p className={classes.description}>
          Work through the modules above to complete your research.
        </p>
      </section>
      <div className={classes.divider} />
      <section>
        <h2>Plan</h2>
      </section>
      <div className={classes.divider} />
      <section>
        <h2>Create</h2>
        <p className={classes.description}>
          This step is all about building your own code, making sure you test as
          you go. Rinse and repeat. Be sure to share it with your friends!
        </p>
        <div className={classes.taskContainer}>
          <h5>Task</h5>
          <ul>
            <li>
              Write some code so your robot detects incoming obstacles and
              avoids them
            </li>
            <li>Reach 1000m to deliver your package. Good luck!</li>
          </ul>
        </div>
      </section>
      <div className={classes.divider} />
      <section>
        <h2>Improve</h2>
        <p className={classes.description}>
          Test what you’ve learnt by taking on more challenges. There are always
          ways to make your solution smarter, faster, stronger!
        </p>
        <div className={classes.taskContainer}>
          <h5>Task</h5>
          <p>
            Did you beat the game? Uh oh, seems like there’s flying drones too!
            Time to rethink your code ...
          </p>
          <ul>
            <li>Modify your code to duck under flying drones</li>
            <li>Deliver that package!</li>
          </ul>
        </div>
      </section>
      <div className={classes.divider} />
      <section>
        <h2>Review</h2>
      </section>
    </div>
  );
};

export default Overview;
