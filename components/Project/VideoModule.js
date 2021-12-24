import VideoViewer from "./VideoViewer";

const VideoModule = ({ module }) => {
	return (
		<div style={{ width: "85%" }}>
			<VideoViewer data={module.data} />
		</div>
	);
};

export default VideoModule;
