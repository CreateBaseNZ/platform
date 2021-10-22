import PROJECT_DIFFICULTIES from "../../constants/projectDifficulties";
import PROJECT_SUBJECTS from "../../constants/projectSubjects";

import classes from "./BrowseTeaching.module.scss";

const BrowseTeaching = ({ project }) => {
	return (
		<>
			<div className={classes.teachingCaption}>
				<span>{project.numOfLessons}</span> lessons <div className={classes.pipe} /> <span>{project.durPerLesson}</span> per lesson <div className={classes.pipe} />{" "}
				<span style={{ color: PROJECT_DIFFICULTIES[project.difficulty] }}>{project.difficulty}</span> level
			</div>
			<div className={classes.subjects}>
				{project.subjects.map((s) => (
					<div key={s} className={classes.tag} style={{ color: PROJECT_SUBJECTS[s].color }}>
						{PROJECT_SUBJECTS[s].label}
					</div>
				))}
			</div>
			<div className={classes.container}>
				{[
					{ pdf: project.lessonPlan, label: "Lesson plan" },
					{ pdf: project.learningOutcome, label: "Learning outcome" },
					{ pdf: project.curriculumAlignment, label: "Curriculum alignment" },
				].map((section) => (
					<div key={section.label} className={classes.wrapper}>
						{section.label}
						<a href={section.pdf} className={classes.btn} title="Download" download>
							<i className="material-icons-outlined">file_download</i>
							Download
						</a>
						<a href={section.pdf} className={classes.btn} title="Open in new tab" target="_blank">
							<i className="material-icons-outlined">launch</i>
							Open in new tab
						</a>
					</div>
				))}
			</div>
		</>
	);
};

export default BrowseTeaching;
