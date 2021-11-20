import classes from "./BrowseOverview.module.scss";

const BrowseOverview = ({ project }) => {
	return <div className={classes.caption}>{project.caption}</div>;
};

export default BrowseOverview;
