import { useContext, useState } from "react";
import CAD_REGIONS from "../../constants/cadRegions";
import PROJECT_DIFFICULTIES from "../../constants/projectDifficulties";
import GlobalSessionContext from "../../store/global-session-context";

import classes from "./BrowseTeaching.module.scss";

const BrowseTeaching = ({ project, role = "" }) => {
	const [selected, setSelected] = useState(0);
	const [showDropdown, setShowDropdown] = useState(false);
	const { globalSession } = useContext(GlobalSessionContext);

	console.log(globalSession.groups[globalSession.recentGroups[0]]);

	const toggleDropdown = () => setShowDropdown((state) => !state);

	const selectHandler = (i) => {
		setSelected(i);
		setShowDropdown(false);
	};

	return role ? (
		<>
			<div className={classes.teachingCaption}>
				<span>{project.numOfLessons}</span> lessons <div className={classes.pipe} /> <span>{project.durPerLesson}</span> per lesson <div className={classes.pipe} />{" "}
				<span style={{ color: PROJECT_DIFFICULTIES[project.difficulty] }}>{project.difficulty}</span> level
			</div>
			<div className={classes.subjects}>
				{project.subjects.map((s) => (
					<div key={s.label} className={classes.tag} style={{ color: s.color }}>
						{s.label}
					</div>
				))}
			</div>
			<div className={classes.container}>
				{[
					{ pdf: project.lessonPlan, label: "Lesson plan" },
					{ pdf: project.learningOutcome, label: "Learning outcome" },
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
				<div className={classes.wrapper}>
					Curriculum alignment
					<div tabIndex={-1} className={classes.dropdownContainer} onBlur={() => setShowDropdown(false)}>
						<label onClick={toggleDropdown}>
							{CAD_REGIONS[selected].name} <i className="material-icons-outlined">arrow_drop_down</i>
						</label>
						{showDropdown && (
							<div className={classes.dropdown}>
								{CAD_REGIONS.map((region, i) => (
									<button key={region.id} className={classes.item} onMouseDown={() => selectHandler(i)}>
										{region.name}
									</button>
								))}
							</div>
						)}
					</div>
					<a href={project.cads[CAD_REGIONS[selected].id]} className={`${classes.btn} ${classes.iconOnly}`} title="Download" download>
						<i className="material-icons-outlined">file_download</i>
					</a>
					<a href={project.cads[CAD_REGIONS[selected].id]} className={`${classes.btn} ${classes.iconOnly}`} title="Open in new tab" target="_blank">
						<i className="material-icons-outlined">launch</i>
					</a>
				</div>
			</div>
			<div className={classes.disclaimer}>If your region is not listed here, keep an eye out for more options coming soon!</div>
		</>
	) : (
		<p className={classes.createAccount}>To view lesson plans and teaching content, you must be viewing as an admin or teacher of a group.</p>
	);
};

export default BrowseTeaching;
