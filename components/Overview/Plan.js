import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import classes from "./overview.module.scss";

const Plan = ({ query }) => {
  return (
    <section id="plan">
      <div className={classes.wrapper}>
        <h2>Plan</h2>
        {query === "send-it" && (
          <p className={classes.description}>
            Open up your learning journal and answer all of the questions in the
            Plan section! If you get stuck, ask one of your classmates for help
            but don't forget to explain your own reasoning!
          </p>
        )}
      </div>
    </section>
  );
};

export default Plan;
