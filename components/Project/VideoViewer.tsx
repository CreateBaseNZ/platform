import { Attributes, memo } from "react";
import { IFullVidData } from "../../types/projects";

import classes from "./VideoViewer.module.scss";

interface VideoViewerProps {
	title: string;
	attributes: Attributes;
	data: IFullVidData;
	controls?: boolean;
}

const VideoViewer = ({ data, attributes, title, controls = true }: VideoViewerProps): JSX.Element => {
	return (
		<div className={classes.wrapper}>
			<video controls={controls} {...attributes} className={classes.video}>
				<source src={data.src} type="video/mp4" />
			</video>
		</div>
	);
};

export default memo(VideoViewer);
