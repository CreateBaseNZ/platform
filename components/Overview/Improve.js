import Image from "next/image";
import Link from "next/link";
import GreenButton from "../UI/GreenButton";

import classes from "/styles/Overview.module.scss";

const Improve = (props) => {
  return (
    <section>
      <h2>Improve</h2>
      <p className={classes.description}>
        Test what you’ve learnt by taking on more challenges. There are always
        ways to make your solution smarter, faster, stronger!
      </p>
      <div className={classes.taskContainer}>
        <h5>Task:</h5>
        <p>
          Did you beat the game? Uh oh, looks like there’s now some flying drones! And is that acceleration? Different sized obstacles too?
          Time to rethink your code...
        </p>
        <ul>
          <li>Modify your code to duck under flying drones.</li>
          <li>Modify your code to take into account an accelerating robot.</li>
          <li>Modify your code to jump over obstacles of different sizes.</li>
          <li>Deliver that package with the highest possible score!</li>
        </ul>
      </div>
      <div className={classes.taskContainer}>
        <h5>Hint:</h5>
        <ul>
          <li>
            Rather than trying to do solve them all at once, try turning on one modifier, updating your code until it works, and only then adding the next modifier until you have solved them all!
          </li>
        </ul>
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
        <Link
          href={{
            pathname: "/improve/[project]",
            query: { project: props.project.query },
          }}
        >
          <div>
            <GreenButton caption="Go!" />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Improve;
