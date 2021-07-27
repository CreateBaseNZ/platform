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
          Open up your learning journal and answer all of the questions in the
          Plan section! If you get stuck, ask one of your classmates for help
          but don't forget to explain your own reasoning!
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
