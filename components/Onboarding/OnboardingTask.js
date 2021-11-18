import Img from "../UI/Img";
import classes from "./OnboardingTask.module.scss";

const OnboardingTask = ({ task, isCompleted, checkHandler }) => {
	return (
		<div className={`${classes.task} ${isCompleted ? classes.completed : ""}`}>
			<div className={classes.imgContainer}>
				<Img style={{ height: "100%", width: "100%" }} src={task.imgUrl} layout="fill" objectFit="cover" />
			</div>
			<div className={classes.cover} style={{ backgroundColor: task.color }} />
			<button className={classes.status} onClick={checkHandler}>
				{isCompleted ? "Completed" : "Mark complete"}
				<div className={`${classes.checkbox} ${isCompleted ? classes.checked : ""}`}>{isCompleted && <i className="material-icons-outlined">check</i>}</div>
			</button>
			{task.type === "video" && <i className={`material-icons-outlined ${classes.icon}`}>play_circle_outline</i>}
			{task.type === "text" && <i className={`material-icons-outlined ${classes.icon}`}>sticky_note_2</i>}
			<div className={classes.titleContainer}>
				<div className={classes.titleWrapper}>
					<div className={classes.subtitle}>{task.subtitle}</div>
					<h2>{task.title}</h2>
				</div>
				{task.type === "link" && <i className={`material-icons-outlined ${classes.icon}`}>arrow_forward</i>}
			</div>
		</div>
	);
};

export default OnboardingTask;
