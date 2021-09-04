import Img from "../UI/Img";

import classes from "./BrowseThumb.module.scss";

const BrowseThumb = ({ isActive, index, thumbnailHandler, query, name }) => {
  console.log(`/${query}/img/thumbnail.png`);

  return (
    <div
      className={`${classes.container} ${
        isActive ? classes.activeContainer : ""
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