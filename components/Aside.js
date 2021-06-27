import classes from "./Aside.module.scss";

const Aside = () => {
  return (
    <aside className={classes.aside}>
      <div className={classes.survey}></div>
      {/* <h3 className={classes.h3}>Check out our other games</h3> */}
    </aside>
  );
};

export default Aside;
