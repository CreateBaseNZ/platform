import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import classes from "./Img.module.scss";

const Img = ({ style, label, ...rest }) => {
	const ref = useRef();
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		return () => (ref.current = false);
	}, []);

	const loadingCompleteHandler = () => {
		if (ref.current) {
			setLoaded(true);
		}
	};

	return (
		<div ref={ref} className={`${classes.wrapper} ${loaded ? classes.loaded : ""}`} style={{ ...style, position: "relative" }}>
			<Image onLoadingComplete={loadingCompleteHandler} {...rest} />
			{label && <label>{label}</label>}
		</div>
	);
};

export default Img;
