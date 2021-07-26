import { ResourceModule } from "../Modules";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import classes from "/styles/Overview.module.scss";

const Plan = (props) => {
  const clickHandler = () => {
    props.setUnlocked((state) => ({
      ...state,
      create: true,
    }));
    localStorage.setItem("run-it-down__create-unlocked", true);
  };

  return (
    <section id="plan">
      <div
        className={`${classes.wrapper} ${props.unlocked ? "" : classes.locked}`}
      >
        <h2>Plan</h2>
        <p className={classes.description}>
          One made in Google Docs and the other in Word, open one of these
          documents, create a copy and save it somewhere that you can access.
          Your teacher will tell you which file to open and where to save your
          copy.
        </p>
        <div className={classes.moduleContainer}>
          <a
            href="https://docs.google.com/document/d/1BiybIT05ANt76b4rw0ArjHVHpN5LXWNxNCjavtnTM3A/edit?usp=sharing"
            target="_blank"
            title="Learning Journal - Google Docs"
            onClick={clickHandler}
          >
            <ResourceModule>
              <span>Learning Journal</span> - Docs
            </ResourceModule>
          </a>
          <a
            href="/Learning Journal.docx"
            title="Learning Journal - Word"
            download
            onClick={clickHandler}
          >
            <ResourceModule>
              <span>Learning Journal</span> - Word
            </ResourceModule>
          </a>
        </div>
        <p className={classes.description}>
          Open up your learning journal and answer all of the questions in the Plan section! If you get stuck,
          ask one of your classmates for help but don't forget to explain your own reasoning!
        </p>
      </div>
      {!props.unlocked && (
        <LockOutlinedIcon
          className={classes.lockIcon}
          style={{ fontSize: 48 }}
        />
      )}
    </section>
  );
};

export default Plan;
