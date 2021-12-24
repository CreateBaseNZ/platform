import classes from "./SkeletonTable.module.scss";

const SkeletonTable = ({ rows, containerClass = "" }) => {
	return (
		<div className={`${classes.skeletonLoading} ${containerClass}`}>
			{Array.from(Array(rows).keys()).map((key) => (
				<span key={key} />
			))}
		</div>
	);
};

export default SkeletonTable;
