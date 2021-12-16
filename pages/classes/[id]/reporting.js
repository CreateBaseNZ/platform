import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import useClass from "../../../hooks/useClass";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import DummyBanner from "../../../components/Classes/DummyBanner";
import ResyncButton from "../../../components/Classes/ResyncButton";
import HeaderToggle from "../../../components/Layouts/MainLayout/HeaderToggle";
import Select from "../../../components/Classes/Select";
import InfoTooltip from "../../../components/Classes/InfoTooltip";
import DateSelect from "../../../components/Classes/Reporting/DateSelect";
import ScheduleReport from "../../../components/Classes/Reporting/ScheduleReport";
import SkeletonTable from "../../../components/UI/SkeletonTable";
import CLASSES_TABS, { DUMMY_REPORTING_DATA, PROJECT_OPTIONS } from "../../../constants/classesConstants";

import classes from "../../../components/Classes/Reporting.module.scss";

const ClassesReporting = () => {
	const ref = useRef();
	const { classObject, classLoaded, fetchReportingData, lastSynced } = useClass();
	const [dateSelect, setDateSelect] = useState(new Date());
	const [studentSelect, setStudentSelect] = useState();
	const [projectSelect, setProjectSelect] = useState(PROJECT_OPTIONS[0]);
	const [isDummy, setIsDummy] = useState(false);
	const [preData, setPreData] = useState();
	const [postData, setPostData] = useState();
	const [lastSaved, setLastSaved] = useState();

	useEffect(() => {
		return () => (ref.current = null);
	}, []);

	useEffect(async () => {
		if (classLoaded) {
			let _preData = await fetchReportingData();
			if (!ref.current) return;
			if (!_preData.length) {
				_preData = DUMMY_REPORTING_DATA;
				setIsDummy(true);
			}
			console.log(_preData);
			setStudentSelect(_preData[0]);
			setPreData(_preData);
		}
	}, [classLoaded]);

	useEffect(() => {
		if (!preData) return;
		setPostData(preData.find((student) => student.id === studentSelect.id).projects[projectSelect.id]);
	}, [preData, studentSelect, projectSelect]);

	const syncHandler = async () => {
		setPreData(null);
		let _preData = await fetchReportingData();
		if (!ref.current) return;
		if (!_preData.length) {
			_preData = DUMMY_REPORTING_DATA;
			setIsDummy(true);
		}
		setPreData(_preData);
	};

	return (
		<div ref={ref} className={classes.view}>
			<Head>
				<title>Reporting • {classObject.name} | CreateBase</title>
				<meta name="description" content="View reports of your students' activity on the platform" />
			</Head>
			{isDummy && <DummyBanner />}
			<div className={classes.header}>
				<h1>Reporting</h1>
				<ResyncButton data={preData} syncHandler={syncHandler} lastSynced={lastSynced} />
				<HeaderToggle />
			</div>
			<div className={classes.controls}>
				{postData ? (
					<>
						<DateSelect dateSelect={dateSelect} setDateSelect={setDateSelect} />
						<Select state={studentSelect} setState={setStudentSelect} label="Student" options={preData} width={150} />
						<Select state={projectSelect} setState={setProjectSelect} label="Project" options={PROJECT_OPTIONS} width={150} />
						<InfoTooltip
							content={
								<>
									<p>Use the controls on the left to view activity by date, student, and project.</p>
									<p>Click on a subsystem or the Improve step to see the last saved Flow code.</p>
								</>
							}
						/>
					</>
				) : (
					<>
						<div className={classes.skeletonSelect} style={{ width: "2.5rem" }} />
						<div className={classes.skeletonSelect} />
						<div className={classes.skeletonSelect} />
					</>
				)}
			</div>
			{postData ? <ScheduleReport data={postData} date={dateSelect} /> : <SkeletonTable rows={3} />}
			<div className={classes.snapshot}></div>
		</div>
	);
};

ClassesReporting.getLayout = function getLayout(page) {
	return (
		<MainLayout page="classes">
			<InnerLayout tabs={CLASSES_TABS} backHref="/classes">
				{page}
			</InnerLayout>
		</MainLayout>
	);
};

ClassesReporting.auth = "user";

export default ClassesReporting;
