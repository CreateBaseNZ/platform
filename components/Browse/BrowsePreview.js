import { memo, useState } from "react";
import { SecondaryButton } from "../UI/Buttons";
import Link from "next/link";

import classes from "./BrowsePreview.module.scss";

const tabs = ["Overview", "Teaching", "Learning"];

const BrowsePreview = ({ project, videoLoaded, setVideoLoaded, user }) => {
	console.log(user);

	const [tab, setTab] = useState(0);

	const clickHandler = (i) => {
		setTab(i);
	};

	return (
		<div className={classes.preview}>
			<div className={classes.vidContainer}>
				<video src={`/${project.query}/vid/situation.mp4`} autoPlay={true} muted={true} className={`${classes.vid} ${videoLoaded ? classes.vidLoaded : ""}`} onCanPlay={() => setVideoLoaded(true)}>
					<source type="video/mp4" />
				</video>
			</div>
			<div className={classes.details}>
				<h1 className={classes.h1}>{project.name}</h1>
				{tab === 0 && (
					<div className={classes.overview}>
						<div className={classes.caption}>
							{project.caption}
							{user.loaded & !user.type && <p className={classes.createAccount}>To view lesson plans and teaching content, please create or log into a FREE educator account.</p>}
						</div>
						<div className={classes.btnContainer}>
							<Link href={`/project/${project.query}`}>
								<div>
									<SecondaryButton className={classes.continueBtn} mainLabel="Continue" iconRight={<i className="material-icons-outlined">play_arrow</i>} />
								</div>
							</Link>
						</div>
					</div>
				)}
				{tab === 1 && (
					<div className={classes.teaching}>
						<div className={`${classes.teachingCaption} ${classes[project.difficulty]}`}>
							<span>{project.nLessons}</span> lessons <div className={classes.pipe} /> <span>{project.difficulty}</span> level
						</div>
						<div className={classes.subjects}>
							{project.subjects.map((s) => (
								<div key={s} className={`${classes.tag} ${classes[s.replace(" ", "")]}`}>
									{s}
								</div>
							))}
						</div>
						<div className={classes.moreBtnContainer}>
							<div className={classes.moreBtnWrapper}>
								Project Overview
								<a href={project.learningOutcome} title="Download" download>
									<i className="material-icons-outlined">file_download</i>
								</a>
								<a href={project.learningOutcome} title="Open in new tab" target="_blank">
									<i className="material-icons-outlined">launch</i>
								</a>
							</div>
							<div className={classes.divider} />
							<div className={classes.moreBtnWrapper}>
								Curriculum alignment
								<a href={project.curriculumAlignment} title="Download" download>
									<i className="material-icons-outlined">file_download</i>
								</a>
								<a href={project.curriculumAlignment} title="Open in new tab" target="_blank">
									<i className="material-icons-outlined">launch</i>
								</a>
							</div>
						</div>
						{project.lessonPlan && (
							<a href={project.lessonPlan} target="_blank" className={classes.lessonBtn}>
								<SecondaryButton mainLabel="Lesson Plan" iconLeft={<i className="material-icons-outlined">history_edu</i>} />
							</a>
						)}
					</div>
				)}
				{tab === 2 && (
					<div className={classes.learning}>
						In this Project, learners will:
						<ol>
							{project.learnings.map((text, i) => (
								<li key={i}>{text}</li>
							))}
						</ol>
					</div>
				)}
			</div>
			{user.loaded && (user.type === "educator" || user.type === "admin") && (
				<div className={classes.tabContainer}>
					{tabs.map((t, i) => (
						<button key={i} className={`${classes.tab} ${tab === i ? classes.active : ""}`} onClick={() => clickHandler(i)}>
							{t}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default BrowsePreview;
