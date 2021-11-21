import router from "next/router";
import Img from "../UI/Img";

import styles from "../../styles/_exports.module.scss";
import classes from "./OnboardingTask.module.scss";

const OnboardingTask = ({ task, isCompleted, checkHandler }) => {
	const clickHandler = () => {
		if (task.type === "video") {
		} else if (task.type === "link") {
			router.push(task.link);
		} else if (task.type === "text") {
		}
	};

	const _checkHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
		checkHandler();
	};

	return (
		<div className={`${classes.task} ${classes[task.type]} ${isCompleted ? classes.completed : ""}`} onClick={clickHandler} title={task.title}>
			{task.thumbnail && (
				<div className={classes.imgContainer}>
					<Img style={{ height: "100%", width: "100%" }} src={task.thumbnail} layout="fill" objectFit="cover" />
				</div>
			)}
			<button className={classes.status} onClick={_checkHandler} title={isCompleted ? "Uncheck" : "Mark complete"}>
				{isCompleted ? "Completed" : "Mark complete"}
				<div className={`${classes.checkbox} ${isCompleted ? classes.checked : ""}`}>{isCompleted && <i className="material-icons-outlined">check</i>}</div>
			</button>
			{task.type === "video" && <i className={`material-icons-outlined ${classes.icon}`}>play_circle_outline</i>}
			{task.type === "text" && (
				<i className={`material-icons-outlined ${classes.icon}`} style={{ color: styles.blueDark }}>
					sticky_note_2
				</i>
			)}
			<div className={classes.titleContainer}>
				<div className={classes.titleWrapper}>
					<div className={classes.subtitle}>{task.subtitle}</div>
					<h2>{task.title}</h2>
				</div>
				{task.type === "link" && (
					<i className={`material-icons-outlined ${classes.icon}`} style={{ color: styles.logoLight }}>
						arrow_forward
					</i>
				)}
			</div>
		</div>
	);
};

export default OnboardingTask;
