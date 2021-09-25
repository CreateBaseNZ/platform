import Image from "next/image";

import classes from "./HistoryItem.module.scss";

const HistoryItem = ({ item, index, expand }) => {
  return (
    <div
      className={`${classes.histItem} ${expand ? classes.expanded : ""} ${
        item.correct ? classes.correctItem : classes.incorrectItem
      }`}
    >
      <div className={classes.histImg}>
        <Image
          src={item.capture}
          quality={100}
          layout="fill"
          objectFit="cover"
        />
      </div>
      {item.correct ? (
        <div className={classes.histRecord}>
          <p className={classes.correctRecord}>{item.a}</p>
          <p className={classes.index}>{index + 1}</p>
        </div>
      ) : (
        <div className={classes.histRecord}>
          <p className={classes.incorrectRecord}>{item.r}</p>
          <p className={classes.correctRecord}>• Ans: {item.a}</p>
          <p className={classes.index}>{index + 1}</p>
        </div>
      )}
      {/* <div className={classes.histIndex}>{index + 1}</div> */}
    </div>
  );
};

export default HistoryItem;
