import classes from "./BrowseSpotlight.module.scss";

const BrowseSpotlight = ({ project }) => {
	return (
		<div className={classes.spotlight}>
			<div className={classes.wrapper}>
				<iframe
					src={project.spotlight}
					title={project.name}
					className={classes.iframe}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			</div>
		</div>
	);
};

export default BrowseSpotlight;
