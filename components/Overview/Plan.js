import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import classes from "/styles/Overview.module.scss";

const Plan = (props) => {
  return (
    <section id="plan">
      <div
        className={`${classes.wrapper} ${props.unlocked ? "" : classes.locked}`}
      >
        <h2>Plan</h2>
        <p className={classes.description}>
          When you have your own file, go ahead and answer all of the questions
          in the Plan section!
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
