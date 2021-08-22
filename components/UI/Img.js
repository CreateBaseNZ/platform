import Image from "next/image";
import { useState } from "react";

import classes from "./Img.module.scss";

const Img = (props) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`${classes.wrapper} ${loaded ? classes.loaded : ""}`}>
      <Image
        onLoadingComplete={() => setLoaded(true)}
        {...props}
        className={classes.test}
      />
    </div>
  );
};

export default Img;
