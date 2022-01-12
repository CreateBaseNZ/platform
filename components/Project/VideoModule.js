import VideoViewer from "./VideoViewer";

import classes from "./VideoModule.module.scss";

const VideoModule = ({ module }) => {
	return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<VideoViewer data={module.data} />
			</div>
		</div>
	);
};

export default VideoModule;
