import { ReactElement, useEffect, useRef, useState } from "react";
import Head from "next/head";

import useClass from "../../../hooks/useClass";
import ProgressTable from "../../../components/Classes/Progress/ProgressTable";
import Select from "../../../components/Classes/Select";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import HeaderToggle from "../../../components/Layouts/MainLayout/HeaderToggle";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import SkeletonTable from "../../../components/UI/SkeletonTable";
import DummyBanner from "../../../components/Classes/DummyBanner";
import CLASSES_TABS, { DUMMY_PROGRESS_DATA, PROGRESS_VIEW_OPTIONS, PROJECT_MAP, PROJECT_OPTIONS } from "../../../constants/classesConstants";

import classes from "../../../styles/classesProgress.module.scss";
import ResyncButton from "../../../components/Classes/ResyncButton";
import InfoTooltip from "../../../components/Classes/InfoTooltip";

const ClassesProgress = () => {
	const ref = useRef(null);
	const { classObject, classLoaded, fetchProgressData, lastSynced } = useClass();
	const [viewSelect, setViewSelect] = useState(PROGRESS_VIEW_OPTIONS[0]);
	const [studentSelect, setStudentSelect] = useState();
	const [projectSelect, setProjectSelect] = useState(PROJECT_OPTIONS[0]);
	const [preData, setPreData] = useState();
	const [postData, setPostData] = useState();
	const [tooltip, setTooltip] = useState();
	const [isDummy, setIsDummy] = useState(false);

	useEffect(() => {
		return () => {
			ref.current = null;
		};
	}, []);

	useEffect(() => {
		(async () => {
			if (classLoaded) {
				let _preData = await fetchProgressData();
				if (!ref.current) return;
				if (!_preData.length) {
					_preData = DUMMY_PROGRESS_DATA;
					setIsDummy(true);
				}
				setStudentSelect(_preData[0]);
				setPreData(_preData);
			}
		})();
	}, [classLoaded]);

	useEffect(() => {
		if (!preData || !ref.current) return;
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
		let _preData = await fetchProgressData();
		if (!ref.current) return;
		if (!_preData.length) {
			_preData = DUMMY_PROGRESS_DATA;
			setIsDummy(true);
		}
		setPreData(_preData);
	};

	return (
		<div ref={ref} className={`${classes.view} roundScrollbar`}>
			<Head>
				<title>Progress • {classObject?.name} | CreateBase</title>
				<meta name="description" content="View student project progress by student or  project" />
			</Head>
			{isDummy && <DummyBanner />}
			<div className={classes.header}>
				<h1>Progress</h1>
				<ResyncButton data={preData} syncHandler={syncHandler} lastSynced={lastSynced} />
				<HeaderToggle />
			</div>
			<div className={classes.controls}>
				{postData ? (
					<>
						<Select state={viewSelect} setState={setViewSelect} label="View" options={PROGRESS_VIEW_OPTIONS} width={100} />
						{viewSelect.id === "student" ? (
							<Select state={studentSelect} setState={setStudentSelect} label="Student" options={preData} width={150} />
						) : (
							<Select state={projectSelect} setState={setProjectSelect} label="Project" options={PROJECT_OPTIONS} width={150} />
						)}
						<InfoTooltip
							content={
								<>
									<p>
										The Imagine, Define, Research, and Plan progresses are measured by the cumulative time spent on each step. We have calculated a benchmark for the average minimum time required as a
										flexible guideline.
									</p>
									<p>The Code and Improve steps are tracked by whether the simulation task was completed successfully.</p>
									<b>We recommend interpreting the information presented here with your own discretion.</b>
								</>
							}
						/>
					</>
				) : (
					<>
						<div className={classes.skeletonSelect} />
						<div className={classes.skeletonSelect} />
					</>
				)}
			</div>
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
