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
        <h5>Task</h5>
        <p>
          Did you beat the game? Uh oh, seems like there’s flying drones too!
          Time to rethink your code ...
        </p>
        <ul>
          <li>Modify your code to duck under flying drones</li>
          <li>Deliver that package!</li>
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
