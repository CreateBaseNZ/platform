import Img from "../../components/UI/Img";
import classes from "./Task.module.scss";

const Task = ({ task, isCompleted, checkHandler }) => {
	console.log(task.imgUrl);

	return (
		<div className={classes.task}>
			<div className={classes.imgContainer}>
				<Img style={{ height: "100%", width: "100%" }} src={task.imgUrl} layout="fill" objectFit="cover" />
			</div>
			<div className={classes.cover} style={{ backgroundColor: task.color }} />
			<button className={classes.status} onClick={() => checkHandler(task.id)}>
				{isCompleted ? "Completed" : "Mark complete"}
				<div className={`${classes.checkbox} ${isCompleted ? classes.checked : ""}`}>{isCompleted && <i className="material-icons-outlined">check</i>}</div>
			</button>
			{task.type === "video" && <i className={`material-icons-outlined ${classes.icon}`}>play_circle_outline</i>}
			{task.type === "text" && <i className={`material-icons-outlined ${classes.icon}`}>stick_note_2</i>}
			<div className={classes.titleContainer}>
				<h2>{task.title}</h2>
				{task.type === "link" && <i className={`material-icons-outlined ${classes.icon}`}>arrow_forward</i>}
			</div>
		</div>
	);
};

export default Task;
