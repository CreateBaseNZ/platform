import { SecondaryButton } from "../UI/Buttons";
import Link from "next/link";

import classes from "./BrowsePreview.module.scss";

const BrowsePreview = ({
  project,
  videoLoaded,
  setVideoLoaded,
  paidAccess,
}) => {
  return (
    <div className={classes.preview}>
      <div className={classes.vidContainer}>
        <video
          key={Math.random()}
          src={`/${project.query}/vid/situation.mp4`}
          autoPlay={true}
          muted={true}
          className={`${classes.vid} ${videoLoaded ? classes.vidLoaded : ""}`}
          onCanPlay={() => setVideoLoaded(true)}
        >
          <source type="video/mp4" />
        </video>
      </div>
      <div className={classes.details}>
        <h1 className={classes.h1}>{project.name}</h1>
        <p className={classes.caption}>{project.caption}</p>
        <div className={classes.btnContainer}>
          {paidAccess && project.lessonPlan && (
            <a href={project.lessonPlan} target="_blank">
              <SecondaryButton
                className={classes.lessonBtn}
                mainLabel="Lesson Plan"
                iconLeft={
                  <i className="material-icons-outlined">history_edu</i>
                }
              />
            </a>
          )}
          <Link href={`/${project.query}`}>
            <div>
              <SecondaryButton
                className={classes.continueBtn}
                mainLabel="Continue"
                iconRight={
                  <i className="material-icons-outlined">play_arrow</i>
                }
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BrowsePreview;
