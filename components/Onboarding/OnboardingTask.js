import { useRouter } from "next/router";
import styles from "../../styles/_exports.module.scss";

import classes from "./OnboardingTask.module.scss";

const OnboardingTask = ({ task, isCompleted, checkHandler, setVideoModal, setTextModal }) => {
	const router = useRouter();

	const clickHandler = () => {
		if (task.type === "video") {
			setVideoModal({ ...task, show: true });
		} else if (task.type === "link") {
			router.push(task.linkUrl);
		} else if (task.type === "text") {
			setTextModal({ content: task.content, show: true });
		}
	};

	const _checkHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
		checkHandler();
	};

	return (
		<div className={`${classes.task} ${isCompleted ? classes.completed : ""}`} onClick={clickHandler} title={task.title}>
			<button className={`${classes.status} ${isCompleted ? classes.checked : ""}`} onClick={_checkHandler} title={isCompleted ? "Uncheck" : "Mark complete"}>
				{isCompleted ? "Completed" : "Mark complete"}
				<div className={classes.checkbox}>{isCompleted && <i className="material-icons-outlined">check</i>}</div>
			</button>
			{task.type === "video" && (
				<i className={`material-icons-outlined ${classes.icon}`} style={{ color: "red" }}>
					play_circle_outline
				</i>
			)}
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
