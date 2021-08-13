import Image from "next/image";

import classes from "./HistoryItem.module.scss";

const HistoryItem = ({ item, index }) => {
  return (
    <div className={classes.histItem}>
      <div className={classes.histImg}>
        <Image
          src={item.capture}
          quality={100}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div
        className={`${classes.histIndex} ${
          item.correct ? classes.correct : classes.incorrect
        }`}
      >
        {index + 1}
      </div>
      {item.correct ? (
        <div className={classes.histRecord}>
          <span className={classes.correctRecord}>{item.a}</span>
        </div>
      ) : (
        <div className={classes.histRecord}>
          <span className={classes.incorrectRecord}>{item.r}</span>→
          <span className={classes.correctRecord}>{item.a}</span>
        </div>
      )}
    </div>
  );
};

export default HistoryItem;
