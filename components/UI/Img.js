import Image from "next/image";
import { useState } from "react";

import classes from "./Img.module.scss";

const Img = ({ style, ...rest }) => {
	const [loaded, setLoaded] = useState(false);
	return (
		<div className={`${classes.wrapper} ${loaded ? classes.loaded : ""}`} style={style}>
			<Image onLoadingComplete={() => setLoaded(true)} {...rest} className={classes.test} />
		</div>
	);
};

export default Img;
