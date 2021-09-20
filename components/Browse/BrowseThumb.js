import router from "next/router";
import Img from "../UI/Img";

import classes from "./BrowseThumb.module.scss";

const BrowseThumb = ({ isActive, query, name, setVideoLoaded }) => {
	const clickHandler = () => {
		setVideoLoaded(false);
		router.push(`/browse/${query}`);
	};

	return (
		<div className={`${classes.container} ${isActive ? classes.activeContainer : ""}`} style={{ pointerEvents: query === "none" }}>
			<div className={classes.wrapper} onClick={clickHandler}>
				<Img src={`/${query}/img/thumbnail.png`} layout="fill" objectFit="cover" alt={name} />
				<p className={classes.caption}>{name}</p>
			</div>
		</div>
	);
};

export default BrowseThumb;
