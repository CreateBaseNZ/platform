import { HintModule } from "../Modules";
import classes from "./project.module.scss";

const Review = ({ query }) => {
  return (
    <section id="review">
      <div className={classes.wrapper}>
        <h2>Review</h2>
        <div className={classes.description}>
          Share your thoughts and ideas with your friends and teacher. How did
          everything go? Were you able to complete all the challenges? How did
          you overcome any problems?
        </div>
        <div className={classes.moduleContainer}>
          <a
            href="https://forms.gle/x9dXkBKe2JoewnHH8"
            target="_blank"
            title="Complete our Survey! - Google Forms"
          >
            <HintModule>
              Complete our <span>Survey</span>
            </HintModule>
          </a>
          <a
            href="https://forms.gle/VJNUzpAhXG4KtiZz6"
            target="_blank"
            title="Send us a message! - Google Forms"
          >
            <HintModule>
              Send us a <span>Message</span>
            </HintModule>
          </a>
        </div>
        <div className={classes.description}>
          At the end of the Project, make sure that you fill out our survey!
          Additionally, feel free to send us any messages.
        </div>
      </div>
    </section>
  );
};

export default Review;
