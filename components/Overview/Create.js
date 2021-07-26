import Link from "next/link";
import Image from "next/image";
import GreenButton from "../UI/GreenButton";

import classes from "/styles/Overview.module.scss";

const Create = (props) => {
  return (
    <section>
      <h2>Create</h2>
      <p className={classes.description}>
        This step is all about building your own code, making sure you test as
        you go. Rinse and repeat. Be sure to share it with your friends!
      </p>
      <div className={classes.taskContainer}>
        <h5>Task:</h5>
        <ul>
          <li>
            Write some code so that your robot can detect incoming obstacles and avoid them.
          </li>
          <li>
            Reach 1000m to deliver your package and complete the task. Good luck!
          </li>
        </ul>
      </div>
      <div className={classes.taskContainer}>
        <h5>Hint:</h5>
        <ul>
          <li>
            Make sure that you hit the compile button to upload your code to the robot!
          </li>
        </ul>
      </div>
      <div className={classes.buttonContainer}>
        <Link
          href={{
            pathname: "/create/[project]",
            query: { project: props.project.query },
          }}
        >
          <div>
            <GreenButton caption="Go!" />
          </div>
        </Link>
      </div>
      <div className={classes.graphicContainer}>
        <Image
          src="/overview-create.png"
          alt="Create"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </section>
  );
};

export default Create;
