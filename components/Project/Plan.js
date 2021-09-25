import Img from "../UI/Img";
import classes from "./Plan.module.scss";

const Plan = ({ data }) => {
	return (
		<div className={`${classes.view} roundScrollbar`}>
			<div className={classes.container}>
				<div className={classes.imgWrapper}>
					<Img src="/plan.svg" layout="responsive" width="100%" height="100%" objectFit="contain" />
				</div>
				<div className={classes.contentContainer}>
					<h2>Let's plan!</h2>
					{data.map((p, i) => (
						<p key={i} className={classes.content}>
							{p}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default Plan;
