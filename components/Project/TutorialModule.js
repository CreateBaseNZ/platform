import VideoViewer from "./VideoViewer";

import classes from "./TutorialModule.module.scss";

const TutorialModule = ({ module }) => {
	return (
		<div className={`${classes.tutWrapper} roundScrollbar`}>
			{module.items.map((d, i) => (
				<div key={i} className={classes.item}>
					<VideoViewer
						data={d}
						attributes={{
							autoPlay: true,
							loop: true,
							muted: true,
							allow: "autoplay",
						}}
						controls={false}
					/>
				</div>
			))}
		</div>
	);
};

export default TutorialModule;