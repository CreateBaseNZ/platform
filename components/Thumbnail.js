import Image from "next/image";

import classes from "./Thumbnail.module.scss";

const Thumbnail = ({ activeIndex, index, thumbnailHandler, query, name }) => {
  return (
    <div
      className={`${classes.projectThumbnailWrapper} ${
        activeIndex === index ? classes.selectedThumbnail : ""
      }`}
    >
      <div
        className={classes.projectThumbnail}
        onClick={thumbnailHandler.bind(this, index)}
      >
        <Image
          src={`/${query}/img/thumbnail.png`}
          layout="fill"
          objectFit="cover"
          alt={name}
        />
        <p>
          <span className="span">{name}</span>
        </p>
      </div>
    </div>
  );
};

export default Thumbnail;
