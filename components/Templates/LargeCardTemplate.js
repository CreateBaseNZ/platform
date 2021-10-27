import classes from "./LargeCardTemplate.module.scss";

const LargeCardTemplate = ({ children }) => {
	return <div className={classes.view}>{children}</div>;
};

export default LargeCardTemplate;
