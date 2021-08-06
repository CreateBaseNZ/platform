import Image from "next/image";
import Link from "next/link";
import GreenButton from "../UI/GreenButton";

import classes from "./overview.module.scss";

const Improve = ({ query }) => {
  return (
    <section id="improve">
      <div className={classes.wrapper}>
        <h2>Improve</h2>
        <p className={`${classes.description} ${classes.halfContainer}`}>
          Test what you’ve learnt by taking on more challenges. There are always
          ways to make your solution smarter, faster, stronger!
        </p>
        <div className={`${classes.taskContainer} ${classes.halfContainer}`}>
          <h5>Task:</h5>
          {query === "send-it" && (
            <>
              <p>
                Did you beat the game? Uh oh, looks like there’s now some flying
                drones! And is that acceleration? Different sized obstacles too?
                Time to rethink your code...
              </p>
              <ul>
                <li>Modify your code to duck under flying drones.</li>
                <li>
                  Modify your code to take into account an accelerating robot.
                </li>
                <li>Modify your code to jump over obstacles of different sizes.</li>
                <li>Deliver that package with the highest possible score!</li>
              </ul>
            </>
          )}
          {query === "the-zucc" && (
            <>
              <p>
                Did you manage to clean up the facility? Uh oh, looks like there's now
                even more items scattered across the floor! Lucky for us, this time
                it is after hours! Have fun playing around with MagneBot with no rules to follow or
                objectives to complete. However, if you want a challenge, try attempting
                one of the following tasks and see if you can best your classmates.
              </p>
              <ul>
                <li>How many items can you stack on top of each other? (our record is five 😱)</li>
                <li>Try and throw every object over the edge of the platform.</li>
                <li>How many items can you place on top of the conveyor belt? (hint: you might need
                  to create some kind of ramp)</li>
              </ul>
            </>
          )}
        </div>
        <div className={classes.taskContainer}>
          <h5>Hint:</h5>
          {query === "send-it" && (
            <>
              <ul>
                <li>
                  Rather than trying to do solve them all at once, try turning on
                  one modifier, updating your code until it works, and only then
                  adding the next modifier until you have solved them all!
                </li>
              </ul>
            </>
          )}
          {query === "the-zucc" && (
            <>
              <ul>
                <li>
                  Challenge your friends to see who can complete one of the above tasks the best and/or
                  fastest. If you are feeling especially spicy, you could even create your own tasks!
                </li>
              </ul>
            </>
          )}
        </div>
        <div className={classes.graphicContainer}>
          <Image
            src="/overview-improve.png"
            alt="Create"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className={classes.buttonContainer}>
          <Link href={`/${query}/improve`}>
            <div>
              <GreenButton caption="Go!" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Improve;
