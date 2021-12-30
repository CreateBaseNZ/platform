import { memo } from "react";
import { YTIcon } from "../UI/Icons";

import classes from "./VideoViewer.module.scss";

const VideoViewer = ({ data = {}, captionClass = "", controls = true, attributes, title }) => {
	return (
		<div className={classes.wrapper}>
			<video controls={controls} {...attributes} className={classes.video}>
				<source src={data.src} type="video/mp4" />
			</video>
			{(data.h1 || data.h2) && (
				<div className={`${classes.caption} ${captionClass}`}>
					<span>
						<b>{data.h1}</b>
						<span style={{ display: "block", height: 8 }} />
						{data.h2}
					</span>
					<YTIcon className={classes.yt} title={`Watch ${title} on YouTube`} href={data.url} fill="#cecece" height="40" width="40" iconHeight="24" iconWidth="24" />
				</div>
			)}
			{data.subtitle && <div className={classes.subtitle}>{data.subtitle}</div>}
		</div>
	);
};

export default memo(VideoViewer);
