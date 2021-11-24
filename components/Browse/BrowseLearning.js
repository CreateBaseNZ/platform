import classes from "./BrowseLearning.module.scss";

const BrowseLearning = ({ learnings }) => {
	return (
		<div className={classes.learning}>
			By the end of this Project, learners will be able to:
			<ol>
				{learnings.map((text, i) => (
					<li key={i}>{text}</li>
				))}
			</ol>
		</div>
	);
};

export default BrowseLearning;
