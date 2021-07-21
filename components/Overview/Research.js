import Link from "next/link";
import {
  InfoModule,
  TutorialModule,
  VideoModule,
  SneakPeekModule,
} from "../Modules";

import classes from "/styles/Overview.module.scss";

const Research = (props) => {
  const sendItHandler = () => {
    return;
  };

  return (
    <section>
      <h2>Research</h2>
      <div className={classes.moduleContainer}>
        <InfoModule>
          What is <span>Flow</span> Programming?
        </InfoModule>
        <TutorialModule>
          Introduction to Flow <span>Blocks</span>
        </TutorialModule>
        <TutorialModule onClick={sendItHandler}>
          How to <span>Send It</span>
        </TutorialModule>
        <VideoModule>
          Rewatch the <span>Situation</span> Video
        </VideoModule>
        <Link
          href={{
            pathname: "/play/[project]",
            query: { project: props.project.query },
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
  );
};

export default Research;
