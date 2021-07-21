import classes from "/styles/Overview.module.scss";

const Review = (props) => {
  return (
    <section>
      <h2>Review</h2>
      <div className={classes.description}>
        Share your thoughts and ideas with your friends and teacher. How did
        everything go? Were you able to complete all the challenges? How did you
        overcome any problems?
      </div>
    </section>
  );
};

export default Review;
