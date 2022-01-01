import { Attributes, memo } from "react";
import { YTIcon } from "../UI/Icons";

import classes from "./VideoViewer.module.scss";

export interface IBasicVidData {
	src: string;
	subtitle: JSX.Element;
}

export interface IFullVidData {
	url: string;
	src: string;
	h1: string;
	h2: string;
}

interface IVideoViewerProps {
	title: string;
	attributes: Attributes;
	data: IBasicVidData | IFullVidData;
	controls?: boolean;
}

const VideoViewer = ({ data, attributes, title, controls = true }: IVideoViewerProps): JSX.Element => {
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
