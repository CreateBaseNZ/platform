import classes from "./BrowseSpotlight.module.scss";

const BrowseSpotlight = ({ project }) => {
	return (
		<div className={classes.spotlight}>
			{project.spotlight ? (
				<div className={classes.wrapper}>
					<iframe
						src={project.spotlight}
						title={project.name}
						className={classes.iframe}
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
					<div className={classes.download}>
						Can't view the video? Download it{" "}
						<a href={`https://raw.githubusercontent.com/CreateBaseNZ/public/main/${project.query}/vid/spotlight.mp4`} download>
							here
						</a>
					</div>
				</div>
			) : (
				"Video spotlight coming soon! Check out the overview and learning tabs in the meantime 👀"
			)}
		</div>
	);
};

export default BrowseSpotlight;
