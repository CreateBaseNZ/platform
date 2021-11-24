import Link from "next/link";
import Img from "../UI/Img";

import classes from "./BrowseThumb.module.scss";

const BrowseThumb = ({ isActive, query, name }) => {
	return (
		<Link href={`/browse/${query}`}>
			<button className={`${classes.container} ${isActive ? classes.activeContainer : ""}`}>
				<Img src={`https://raw.githubusercontent.com/CreateBaseNZ/public/main/${query}/img/thumbnail.png`} layout="responsive" width={1920} height={1080} alt={name} />
				<p className={classes.caption}>{name}</p>
			</button>
		</Link>
	);
};

export default BrowseThumb;
