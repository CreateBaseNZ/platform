import classes from "./Frame.module.scss";

const Frame = ({ children, session, type, org, name }) => {
  return (
    <div className={classes.frame}>
      <nav className={classes.nav}></nav>
      <div className={classes.view}>
        <header className={classes.header}></header>
        {children}
      </div>
    </div>
  );
};

export default Frame;
