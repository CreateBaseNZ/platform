import { useEffect, useRef, useState, CSSProperties } from "react";
import Image, { ImageProps } from "next/image";

import classes from "./Img.module.scss";

interface ImgProps extends ImageProps {
	label?: string;
	style?: CSSProperties;
}

const Img = ({ style, label, ...rest }: ImgProps): JSX.Element => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		return () => {
			ref.current = null;
		};
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
