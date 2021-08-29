import Img from "../components/UI/Img";

import classes from "./BrowseThumb.module.scss";

const BrowseThumb = ({ activeIndex, index, thumbnailHandler, query, name }) => {
  return (
    <div
      className={`${classes.container} ${
        activeIndex === index ? classes.activeContainer : ""
      }`}
    >
      <div
        className={classes.wrapper}
        onClick={thumbnailHandler.bind(this, index)}
      >
        <Img
          src={`/${query}/img/thumbnail.png`}
          layout="fill"
          objectFit="cover"
          alt={name}
        />
        <p className={classes.caption}>{name}</p>
      </div>
    </div>
  );
};

export default BrowseThumb;
