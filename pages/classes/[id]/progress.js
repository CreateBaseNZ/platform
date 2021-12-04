import { useContext, useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import useClass from "../../../hooks/useClass";
import GlobalSessionContext from "../../../store/global-session-context";
import ProgressTable from "../../../components/Classes/Progress/ProgressTable";
import Select from "../../../components/Classes/Progress/Select";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import HeaderToggle from "../../../components/Layouts/MainLayout/HeaderToggle";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import { SecondaryButton } from "../../../components/UI/Buttons";
import SkeletonTable from "../../../components/UI/SkeletonTable";
import { ALL_PROJECT_DATA } from "../../../utils/getProjectData";
import CLASSES_TABS, { PROGRESS_VIEW_OPTIONS } from "../../../constants/classesConstants";
import DUMMY_STUDENTS from "../../../constants/progress";

import classes from "../../../styles/classesProgress.module.scss";
import tracking from "../../../utils/tracking";
import VisualBellContext from "../../../store/visual-bell-context";

const EVENTS = [
	"project_define",
	"project_imagine",
	"project_improve",
	"project_create_research",
	"project_create_plan",
	"code_create_time",
	"code_improve_time",
	"game_manual_progress",
	"game_create_progress",
	"game_improve_progress",
];

const getStatus = (duration, threshold, formattedThreshold, gameProgressEvent, isWin) => {
	let status = "";
	let primaryLabel = "Not visited";
	let secondaryLabel = "";

	if (duration > threshold) {
		status = "completed";
		primaryLabel = `Time spent ≥${formattedThreshold}`;
	} else if (duration > 0) {
		status = "visited";
		primaryLabel = `Time spent <${formattedThreshold}`;
	}

	if (duration > 0 && gameProgressEvent) {
		secondaryLabel = ""; // can use primaryLabel
		if (isWin) {
			status = "completed";
			primaryLabel = "Task completed";
		} else {
			status = "visited";
			primaryLabel = "Task in progress";
		}
	}

	return { status, primaryLabel, secondaryLabel };
};

const PROJECT_OPTIONS = ALL_PROJECT_DATA.map((project) => ({ id: project.query, name: project.name }));

const PROJECT_MAP = PROJECT_OPTIONS.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.name }), {});

const ClassesProgress = () => {
	const ref = useRef();
	const { globalSession, trackingData } = useContext(GlobalSessionContext);
	const { classObject, classLoaded } = useClass();
	const { setVisualBell } = useContext(VisualBellContext);
	const [viewSelect, setViewSelect] = useState(PROGRESS_VIEW_OPTIONS[0]);
	const [studentSelect, setStudentSelect] = useState();
	const [projectSelect, setProjectSelect] = useState(PROJECT_OPTIONS[0]);
	const [preData, setPreData] = useState();
	const [postData, setPostData] = useState();
	const [tooltip, setTooltip] = useState();
	const [isDummy, setIsDummy] = useState(false);

	useEffect(() => {
		return () => (ref.current = null);
	}, []);

	useEffect(() => {
		if (!classLoaded || !trackingData.loaded) return;

		if (!trackingData.data) return setVisualBell({ type: "warning", message: "Sorry, we couldn't retrieve the data you were after. Please try again in a few minutes." });

		const filters = EVENTS.map((ev) => ({ event: ev, properties: [{ schools: globalSession.groups[globalSession.recentGroups[0]].id }] }));

		console.log(trackingData);

		const rawData = tracking.postprocess(trackingData.data, filters);

		const processData = (event, project, license, threshold, subsystem, gameProgressEvent) => {
			let duration = 0;
			let isWin = false;

			for (let k = 0; k < rawData.length; k++) {
				if (
					rawData[k].event === event &&
					rawData[k].properties.project === project &&
					rawData[k].properties.licenses.includes(license) &&
					(subsystem ? rawData[k].properties.subsystem === subsystem : true)
				) {
					duration += rawData[k].properties.duration;
				}
				if (
					gameProgressEvent &&
					rawData[k].event === gameProgressEvent &&
					rawData[k].properties.project === project &&
					rawData[k].properties.licenses.includes(license) &&
					(subsystem ? rawData[k].properties.subsystem === subsystem : true)
				) {
					isWin = rawData[k].properties.state === "win";
				}
			}
			const formattedThreshold = `${Math.floor(threshold / 3600) ? `${Math.floor(threshold / 3600)}hr` : ""}${Math.floor((threshold % 3600) / 60) ? ` ${Math.floor((threshold % 3600) / 60)}min` : ""}${
				Math.floor(threshold % 60) ? ` ${Math.floor(threshold % 60)}s` : ""
			}`;
			const formattedDuration = `${Math.floor(duration / 3600) ? `${Math.floor(duration / 3600)}hr` : ""}${Math.floor((duration % 3600) / 60) ? ` ${Math.floor((duration % 3600) / 60)}min` : ""}${
				Math.floor(duration % 60) ? ` ${Math.floor(duration % 60)}s` : ""
			}`;

			const params = getStatus(duration, threshold, formattedThreshold, gameProgressEvent, isWin);

			return { ...params, formattedDuration };
		};

		const processCreateData = (project, subsystems, license) => {
			const createData = {};
			for (let j = 0; j < subsystems.length; j++) {
				createData[subsystems[j].title] = {
					name: subsystems[j].title,
					research: processData("project_create_research", project, license, subsystems[j].research.threshold, subsystems[j].title),
					plan: processData("project_create_plan", project, license, subsystems[j].plan.threshold, subsystems[j].title),
					code: processData("code_create_time", project, license, subsystems[j].code.threshold, subsystems[j].title, "game_create_progress"),
				};
			}
			return createData;
		};

		let _preData = classObject.students.map((student) => {
			const studentData = { id: student.licenseId, name: `${student.firstName} ${student.lastName}`, projects: {} };
			for (let i = 0; i < ALL_PROJECT_DATA.length; i++) {
				studentData.projects[ALL_PROJECT_DATA[i].query] = {
					define: processData("project_define", ALL_PROJECT_DATA[i].query, student.licenseId, ALL_PROJECT_DATA[i].define.threshold),
					imagine: processData("project_imagine", ALL_PROJECT_DATA[i].query, student.licenseId, ALL_PROJECT_DATA[i].imagine.threshold),
					create: processCreateData(ALL_PROJECT_DATA[i].query, ALL_PROJECT_DATA[i].subsystems, student.licenseId),
					improve: processData("code_improve_time", ALL_PROJECT_DATA[i].query, student.licenseId, ALL_PROJECT_DATA[i].improve.threshold, undefined, "game_improve_progress"),
				};
			}
			return studentData;
		});

		if (!ref.current) return;

		if (!_preData.length) {
			_preData = DUMMY_STUDENTS;
			setIsDummy(true);
		}

		setPreData(_preData);
		setStudentSelect(_preData[0]);
	}, [classLoaded, trackingData.loaded]);

	useEffect(() => {
		if (!preData) return;

		if (viewSelect.id === "student") {
			const student = preData.find((student) => student.id === studentSelect.id);
			if (student) {
				setPostData(Object.keys(student.projects).map((key) => ({ ...student.projects[key], id: key, name: PROJECT_MAP[key] })));
			} else {
				setStudentSelect(preData[0]);
			}
		} else {
			setPostData(preData.map((student) => ({ ...student.projects[projectSelect.id], id: student.id, name: student.name })));
		}
	}, [preData, viewSelect, studentSelect, projectSelect]);

	return (
		<div ref={ref} className={`${classes.view} roundScrollbar`}>
			<Head>
				<title>Progress • {classObject.name} | CreateBase</title>
				<meta name="description" content="View your class announcements" />
			</Head>
			{isDummy && (
				<div className={classes.banner}>
					<i className="material-icons-outlined">tips_and_updates</i>
					<div className={classes.bannerText}>
						<div className={classes.bannerHeading}>Welcome! You're viewing a class Progress demo</div>
						<div className={classes.bannerBody}>The class data you are seeing is a sample set so you can start exploring some of the features!</div>
					</div>
					<Link href={{ pathname: "/classes/[id]/manage-members", query: { id: router.query.id } }}>
						<div>
							<SecondaryButton className={classes.bannerBtn} mainLabel="Add students" iconLeft={<i className="material-icons-outlined">person_add</i>} />
						</div>
					</Link>
				</div>
			)}
			<div className={classes.header}>
				<h1>Progress</h1>
				<HeaderToggle />
			</div>
			{postData ? (
				<div className={classes.controls}>
					<Select state={viewSelect} setState={setViewSelect} label="View" options={PROGRESS_VIEW_OPTIONS} width={100} />
					{viewSelect.id === "student" ? (
						<Select state={studentSelect} setState={setStudentSelect} label="Student" options={preData} width={150} />
					) : (
						<Select state={projectSelect} setState={setProjectSelect} label="Project" options={PROJECT_OPTIONS} width={150} />
					)}
					<div className={classes.helpContainer}>
						<button>
							<i className="material-icons-outlined">help_outline</i>
							How does this work?
						</button>
						<div className={classes.help}>
							<p>
								The Imagine, Define, Research, and Plan progresses are measured by the cumulative time spent on each step. We have calculated a benchmark for the average minimum time required as a
								flexible guideline.
							</p>
							<p>The Code and Improve steps are tracked by whether the simulation task was completed successfully.</p>
							<b>We recommend interpreting the information presented here with your own discretion.</b>
						</div>
					</div>
				</div>
			) : (
				<div className={classes.controls}>
					<div className={classes.skeletonSelect} />
					<div className={classes.skeletonSelect} />
				</div>
			)}
			{postData ? <ProgressTable data={postData} view={viewSelect} setTooltip={setTooltip} /> : <SkeletonTable rows={4} />}
			{tooltip && (
				<div className={classes.tooltip} style={{ ...tooltip.position, ...tooltip.style }}>
					<div className={classes.tooltipTitle}>{tooltip.title}</div>
					<div className={classes.tooltipStep}>{tooltip.step}</div>
					<div className={classes[tooltip.status]}>{tooltip.primaryLabel}</div>
					{tooltip.secondaryLabel ? <div className={classes.tooltipDuration}>{tooltip.secondaryLabel}</div> : null}
					{tooltip.status ? <div className={classes.tooltipDuration}>{tooltip.formattedDuration}</div> : null}
				</div>
			)}
		</div>
	);
};

ClassesProgress.getLayout = function getLayout(page) {
	return (
		<MainLayout page="classes">
			<InnerLayout tabs={CLASSES_TABS} backHref="/classes">
				{page}
			</InnerLayout>
		</MainLayout>
	);
};

ClassesProgress.auth = "user";

export default ClassesProgress;
