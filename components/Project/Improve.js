import Link from "next/link";
import Img from "../UI/Img";
import classes from "./Improve.module.scss";

const Improve = ({ query, data }) => {
  return (
    <div className={classes.view}>
      <div className={`${classes.leftContainer} roundScrollbar`}>
        {data && data.alert && (
          <div className={classes.alert}>
            <h2>
              <span className="material-icons-outlined">campaign</span> Alert
            </h2>
            {data.alert}
          </div>
        )}
        {data && data.tasks && (
          <ul className={classes.tasks}>
            <h2>
              <span className="material-icons-outlined">inventory</span> Tasks
            </h2>
            {data.tasks.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        )}
        {data && data.hints && (
          <ul className={classes.hints}>
            <h2>
              <span className="material-icons-outlined">lightbulb</span> Hints
            </h2>
            {data.hints.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}
      </div>
      <div className={classes.rightContainer}>
        <div className={classes.imgContainer}>
          <Img
            src="/improve.svg"
            layout="responsive"
            width={1000}
            height={1000}
            objectFit="cover"
          />
        </div>
        <div className={classes.caption}>{data.caption}</div>
        <Link href={`/${query}/code/improve`}>
          <button className={classes.btn}>
            Improve It!
            <span className="material-icons-outlined">trending_up</span>
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Improve;
