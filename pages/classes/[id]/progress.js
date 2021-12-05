import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import useClass from "../../../hooks/useClass";
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
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

import classes from "../../../styles/classesProgress.module.scss";
import ReactTimeAgo from "react-time-ago";

TimeAgo.addLocale(en);

const PROJECT_OPTIONS = ALL_PROJECT_DATA.map((project) => ({ id: project.query, name: project.name }));

const PROJECT_MAP = PROJECT_OPTIONS.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.name }), {});

const ClassesProgress = () => {
	const ref = useRef();
	const { classObject, classLoaded, fetchData, lastSynced } = useClass();
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

	useEffect(async () => {
		if (classLoaded) {
			const _preData = await fetchData();

			if (!_preData.length) {
				_preData = DUMMY_STUDENTS;
				setIsDummy(true);
			}

			setPreData(_preData);
			setStudentSelect(_preData[0]);
		}
	}, [classLoaded]);

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

	const syncHandler = async () => {
		setPreData(null);
		const _preData = await fetchData();
		if (!_preData.length) {
			_preData = DUMMY_STUDENTS;
			setIsDummy(true);
		}
		setPreData(_preData);
		setStudentSelect(_preData[0]);
	};

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
				<button className={`${classes.sync} ${preData ? "" : classes.syncing}`} onClick={syncHandler} title="Click to resync">
					<i className="material-icons-outlined">sync</i>
					{preData ? (
						<>
							Last synced <ReactTimeAgo date={lastSynced} locale={navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language} style={{ marginLeft: "0.25em" }} />
						</>
					) : (
						`Syncing, please wait ...`
					)}
				</button>
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
