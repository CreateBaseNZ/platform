import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import {
  HintModule,
  VideoModule,
  InfoModule,
  SneakPeekModule,
  TutorialModule,
  ResourceModule,
} from "../../components/Modules";

import classes from "/styles/Overview.module.scss";
import GreenButton from "../../components/UI/GreenButton";

const DUMMY_QUERY = {
  "send-it": {
    query: "send-it",
    name: "Send It",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non aliquam augue. Nullam nunc purus, iaculis at congue a, varius vel massa. Suspendisse eget pharetra ipsum. Praesent vulputate ipsum laoreet tempor viverra. Curabitur vehicula bibendum facilisis. Duis tincidunt mauris ac sem imperdiet imperdiet.",
    stacked: true,
  },
};

const Overview = (props) => {
  const router = useRouter();
  const [project, setProject] = useState({});

  console.log(project);

  useEffect(() => {
    if (router.query.project) {
      setProject(DUMMY_QUERY[router.query.project[0]]);
    }
  }, [router.query]);

  return (
    <div className={classes.overview}>
      <Head>
        <title>
          Overview - {project ? project.name : "Create"} - CreateBase
        </title>
        <meta name="description" content={project ? project.caption : ""} />
      </Head>
      <section>
        <h2>Imagine</h2>
        <div className={classes.centerContainer}>
          <VideoModule>
            The <span>Situation</span>
          </VideoModule>
        </div>
        <div className={classes.centerContainer}>
          <p className={classes.description}>
            Dive into the situation. What do you think is happening here?
          </p>
        </div>
      </section>
      <div className={classes.divider} />
      <section>
        <h2>Define</h2>
        <p className={classes.description}>
          Narrow in on the problem and get to know your tools. Where to begin,
          where to begin ...
        </p>
      </section>
      <div className={classes.divider} />
      <section>
        <h2>Research</h2>
        <div className={classes.moduleContainer}>
          <InfoModule>
            What is <span>Flow</span> Programming?
          </InfoModule>
          <TutorialModule>
            Introduction to Flow <span>Blocks</span>
          </TutorialModule>
          <HintModule>
            How to <span>Send It</span>
          </HintModule>
          <VideoModule>
            Rewatch the <span>Situation</span> Video
          </VideoModule>
          <Link
            href={{
              pathname: "/play/[project]",
              query: { project: project.query },
            }}
          >
            <div title="Play Send It">
              <SneakPeekModule>
                Give it a <span>Go</span>
              </SneakPeekModule>
            </div>
          </Link>
        </div>
        <p className={classes.description}>
          Work through the modules above to complete your research.
        </p>
      </section>
      <div className={classes.divider} />
      <section>
        <h2>Plan</h2>
        <div className={classes.centerContainer}>
          <a
            href="https://docs.google.com/presentation/d/1_eOO1FbH6qRGbQrGoVNgtD73yJ57yrtk5RpRd6XMtd4/edit?usp=sharing"
            target="_blank"
            title="Learning Journal - Google Slides"
          >
            <ResourceModule>
              <span>Learning Journal</span> - Slides
            </ResourceModule>
          </a>
          <a
            href="/Learning Journal.docx"
            title="Learning Journal - Word"
            download
          >
            <ResourceModule>
              <span>Learning Journal</span> - Word
            </ResourceModule>
          </a>
        </div>
        <div className={classes.centerContainer}>
          <p className={classes.description}>
            One made in Google Slides and the other in Word, either will do the
            trick so just choose one. Be sure to create a copy and make it all
            yours.
          </p>
        </div>
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
        <div className={classes.buttonContainer}>
          <Link
            href={{
              pathname: "/create/[project]",
              query: { project: project.query },
            }}
          >
            <div>
              <GreenButton caption="Go!" />
            </div>
          </Link>
        </div>
        <div className={classes.graphicContainer}>
          <Image
            src="/overview-create.png"
            alt="Create"
            layout="fill"
            objectFit="contain"
          />
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
        <div className={classes.graphicContainer}>
          <Image
            src="/overview-improve.png"
            alt="Create"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={classes.buttonContainer}>
          <Link
            href={{
              pathname: "/improve/[project]",
              query: { project: project.query },
            }}
          >
            <div>
              <GreenButton caption="Go!" />
            </div>
          </Link>
        </div>
      </section>
      <div className={classes.divider} />
      <section>
        <h2>Review</h2>
        <div className={classes.description}>
          Share your thoughts and ideas with your friends and teacher. How did
          everything go? Were you able to complete all the challenges? How did
          you overcome any problems?
        </div>
      </section>
    </div>
  );
};

export default Overview;
