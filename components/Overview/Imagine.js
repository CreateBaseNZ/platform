import classes from "/styles/Overview.module.scss";

const Imagine = (props) => {
  return (
    <section id="imagine">
      <div className={classes.wrapper}>
        <h2>Imagine</h2>
        <div className={classes.centerContainer}>
          <video
            controls
            className={classes.video}
            onEnded={() => {
              props.setUnlocked((state) => ({ ...state, define: true }));
              localStorage.setItem("run-it-down__define-unlocked", true);
            }}
          >
            <source src="/situation.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={classes.centerContainer}>
          <p className={`${classes.description} ${classes.halfContainer}`}>
            Dive into the situation by watching this short video! What do you
            think is happening here? Discuss with your peers!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Imagine;
