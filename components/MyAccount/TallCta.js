import Img from "../UI/Img";

import classes from "./TallCta.module.scss";

const TallCta = ({ className, imgSrc, caption, btn }) => {
  return (
    <div className={`${classes.tallCta} ${className}`}>
      <div className={classes.img}>
        <Img src={imgSrc} layout="fill" objectFit="contain" />
      </div>
      <p>{caption}</p>
      {btn}
    </div>
  );
};

export default TallCta;
