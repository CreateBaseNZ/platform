import classes from "./SkeletonTable.module.scss";

interface ISkeletonTableProps {
	rows?: number;
	containerClass?: string;
}

const SkeletonTable = ({ rows = 1, containerClass = "" }: ISkeletonTableProps): JSX.Element => {
	return (
		<div className={`${classes.skeletonLoading} ${containerClass}`}>
			{Array.from(Array(rows).keys()).map((key) => (
				<span key={key} />
			))}
		</div>
	);
};

export default SkeletonTable;
