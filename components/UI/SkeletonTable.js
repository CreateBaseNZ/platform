import classes from "./SkeletonTable.module.scss";

const SkeletonTable = () => {
	return (
		<div className={classes.skeletonLoading}>
			<span />
			<span />
			<span />
			<span />
		</div>
	);
};

export default SkeletonTable;
