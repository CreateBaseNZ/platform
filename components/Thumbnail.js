import Image from "next/image";

import classes from "./Thumbnail.module.scss";

const Thumbnail = ({
  activeProject,
  index,
  thumbnailHandler,
  src,
  name,
  comingSoon = false,
}) => {
  return (
    <div
      className={`${classes.projectThumbnailWrapper} ${
        activeProject === index ? classes.selectedThumbnail : ""
      }`}
    >
      <div
        className={classes.projectThumbnail}
        onClick={thumbnailHandler.bind(this, index, comingSoon)}
      >
        <Image src={src} layout="fill" objectFit="cover" alt={name} />
        <p>
          <span className="span">{name}</span>
        </p>
      </div>
    </div>
  );
};

export default Thumbnail;
