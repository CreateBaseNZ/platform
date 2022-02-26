import classes from "./VideoModule.module.scss";
import { TVideoModule } from "../../../types/modules";
import YouTube from "react-youtube";

interface Props {
	module: TVideoModule;
}

const VideoModule = ({ module }: Props): JSX.Element => {
	return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				<h1>{module.title}</h1>
				<div className={classes.videoContainer}>
					<YouTube videoId={module.videoId} title={module.title} className={classes.video} />
				</div>
				<p>{module.description}</p>
			</div>
		</div>
	);
};

export default VideoModule;
