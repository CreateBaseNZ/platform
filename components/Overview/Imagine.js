import { VideoModule } from "../Modules";

import classes from "/styles/Overview.module.scss";

const Imagine = (props) => {
  return (
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
  );
};

export default Imagine;
