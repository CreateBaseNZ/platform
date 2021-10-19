import Link from "next/link";
import Img from "../UI/Img";
import classes from "./Create.module.scss";

const Create = ({ query, data, iteration }) => {
	console.log(data);
	return (
		<div className={`${classes.view} roundScrollbar`}>
			<div className={classes.leftContainer}>
				{data && data.tasks && (
					<ul className={classes.tasks}>
						<h2>
							<span className="material-icons-outlined">inventory</span> Tasks
						</h2>
						{data.tasks.map((t, i) => (
							<li key={i}>{t}</li>
						))}
					</ul>
				)}
				{data && data.hints && (
					<ul className={classes.hints}>
						<h2>
							<span className="material-icons-outlined">lightbulb</span> Hints
						</h2>
						{data.hints.map((h, i) => (
							<li key={i}>{h}</li>
						))}
					</ul>
				)}
			</div>
			<div className={classes.rightContainer}>
				<div className={classes.imgContainer}>
					<Img src="/create.svg" layout="responsive" width={1000} height={1000} objectFit="contain" />
				</div>
				<div className={classes.caption}>{data.caption}</div>
				<Link href={`/project/${query}/code/${iteration}/create`}>
					<button className={classes.btn}>
						Start Coding!
						<span className="material-icons-outlined">arrow_right</span>
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Create;
