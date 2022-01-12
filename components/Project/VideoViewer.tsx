import { Attributes, memo } from "react";
import { YTIcon } from "../UI/Icons";
import { IBasicVidData, IFullVidData } from "../../types/projects";

import classes from "./VideoViewer.module.scss";

interface VideoViewerProps {
	title: string;
	attributes: Attributes;
	data: IBasicVidData | IFullVidData;
	controls?: boolean;
}

const VideoViewer = ({ data, attributes, title, controls = true }: VideoViewerProps): JSX.Element => {
	const basicVidData = data as IBasicVidData;
	const fullVidData = data as IFullVidData;

	return (
		<div className={classes.wrapper}>
			<video controls={controls} {...attributes} className={classes.video}>
				<source src={data.src} type="video/mp4" />
			</video>
			{fullVidData.url && (
				<div className={classes.caption}>
					<span>
						<b>{fullVidData.h1}</b>
						<span style={{ display: "block", height: 8 }} />
						{fullVidData.h2}
					</span>
					<YTIcon className={classes.yt} title={`Watch ${title} on YouTube`} href={fullVidData.url} fill="#cecece" height="40" width="40" iconHeight="24" iconWidth="24" />
				</div>
			)}
			{basicVidData.subtitle && <div className={classes.subtitle}>{basicVidData.subtitle}</div>}
		</div>
	);
};

export default memo(VideoViewer);
