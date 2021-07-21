import { useState } from "react";
import { VideoModule } from "../Modules";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "../UI/Modal";

import classes from "/styles/Overview.module.scss";

export const Situation = (props) => {
  return (
    <div className={classes.situation}>
      <button className={classes.situationClose} onClick={props.closeHandler}>
        <CloseIcon />
      </button>
      <video controls>
        <source src="/situation.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

const Imagine = (props) => {
  const [showSituation, setShowSituation] = useState(false);

  const situationShowHandler = () => {
    setShowSituation(true);
  };
  const situationCloseHandler = () => {
    setShowSituation(false);
  };

  return (
    <section>
      {showSituation && (
        <Modal
          children={<Situation closeHandler={situationCloseHandler} />}
          closeHandler={situationCloseHandler}
        />
      )}
      <h2>Imagine</h2>
      <div className={classes.centerContainer}>
        <VideoModule onClick={situationShowHandler}>
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
