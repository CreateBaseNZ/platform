import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import useClass from "../../../hooks/useClass";
import ProgressTable from "../../../components/Classes/Progress/ProgressTable";
import Select from "../../../components/Classes/Progress/Select";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import HeaderToggle from "../../../components/Layouts/MainLayout/HeaderToggle";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import { allData } from "../../../utils/getProjectData";
import CLASSES_TABS, { PROGRESS_VIEW_OPTIONS } from "../../../constants/classesConstants";

import classes from "../../../styles/classesProgress.module.scss";
import useMixpanel from "../../../hooks/useMixpanel";
import GlobalSessionContext from "../../../store/global-session-context";

const printStatus = (status) => {
	switch (status) {
		case "completed":
			return "Completed";
		case "visited":
			return "Visited for ≥60 seconds";
		default:
			return "Visited for <60 seconds";
	}
};

const randomProjects = () => {
	return {
		"heat-seeker": {
			define: { ...generateRandom() },
			imagine: { ...generateRandom() },
			create: {
				"sub-1": {
					name: "Subsystem 1",
					research: { ...generateRandom() },
					plan: { ...generateRandom() },
					code: { ...generateRandom() },
				},
				"sub-2": {
					name: "Subsystem 2",
					research: { ...generateRandom() },
					plan: { ...generateRandom() },
					code: { ...generateRandom() },
				},
			},
			improve: { ...generateRandom() },
		},
		magnebot: {
			define: { ...generateRandom() },
			imagine: { ...generateRandom() },
			create: {
				"sub-1": {
					name: "Subsystem 1",
					research: { ...generateRandom() },
					plan: { ...generateRandom() },
					code: { ...generateRandom() },
				},
			},
			improve: { ...generateRandom() },
		},
		"send-it": {
			define: { ...generateRandom() },
			imagine: { ...generateRandom() },
			create: {
				"sub-1": {
					name: "Subsystem 1",
					research: { ...generateRandom() },
					plan: { ...generateRandom() },
					code: { ...generateRandom() },
				},
				"sub-2": {
					name: "Subsystem 2",
					research: { ...generateRandom() },
					plan: { ...generateRandom() },
					code: { ...generateRandom() },
				},
				"sub-3": {
					name: "Subsystem 3",
					research: { ...generateRandom() },
					plan: { ...generateRandom() },
					code: { ...generateRandom() },
				},
			},
			improve: { ...generateRandom() },
		},
	};
};

const generateRandom = () => {
	const strings = ["completed", "visited", ""];
	const randomIndex = Math.floor(Math.random() * strings.length);
	let duration;
	if (randomIndex === 0) {
		duration = Math.random() * 600 + 60;
	} else if (randomIndex === 1) {
		duration = Math.random() * 600 + 60;
	} else {
		duration = Math.random() * 60;
	}
	return { duration: duration, status: strings[randomIndex] };
};

const DUMMY_STUDENTS = [
	{
		id: "sophieroper",
		name: "Sophie Roper",
		projects: randomProjects(),
	},
	{
		id: "mandybrocklehurst",
		name: "Mandy Brocklehurst",
		projects: randomProjects(),
	},
	{
		id: "isobelmacdougal",
		name: "Isabel MacDougal",
		projects: randomProjects(),
	},
	{
		id: "anthonygoldstein",
		name: "Anthony Goldstein",
		projects: randomProjects(),
	},
	{
		id: "parvatipatil",
		name: "Parvati Patil",
		projects: randomProjects(),
	},
	{
		id: "runcorn",
		name: "Runcorn",
		projects: randomProjects(),
	},
	{
		id: "sallysmith",
		name: "Sally Smith",
		projects: randomProjects(),
	},
	{
		id: "ronaldweasley",
		name: "Ronald Weasley",
		projects: randomProjects(),
	},
	{
		id: "michaelcorner",
		name: "Michael Corner",
		projects: randomProjects(),
	},
	{
		id: "lilymoon",
		name: "Lily Moon",
		projects: randomProjects(),
	},
	{
		id: "traceydavis",
		name: "Tracey Davis",
		projects: randomProjects(),
	},
	{
		id: "nevillelongbottom",
		name: "Neville Longbottom",
		projects: randomProjects(),
	},
	{
		id: "harrypotter",
		name: "Harry Potter",
		projects: randomProjects(),
	},
	{
		id: "susanbones",
		name: "Susan Bones",
		projects: randomProjects(),
	},
	{
		id: "gregorygoyle",
		name: "Gregory Goyle",
		projects: randomProjects(),
	},
	{
		id: "oliverrivers",
		name: "Oliver Rivers",
		projects: randomProjects(),
	},
	{
		id: "theodorenott",
		name: "Theodore Nott",
		projects: randomProjects(),
	},
	{
		id: "lisaturpin",
		name: "Lisa Turpin",
		projects: randomProjects(),
	},
	{
		id: "waynehopkins",
		name: "Wayne Hipkins",
		projects: randomProjects(),
	},
	{
		id: "deanthomas",
		name: "Dean Thomas",
		projects: randomProjects(),
	},
	{
		id: "meganjones",
		name: "Megan Jones",
		projects: randomProjects(),
	},
	{
		id: "sueli",
		name: "Sue Li",
		projects: randomProjects(),
	},
	{
		id: "terryboot",
		name: "Terry Boot",
		projects: randomProjects(),
	},
	{
		id: "stephencornfoot",
		name: "Stephen Cornfoot",
		projects: randomProjects(),
	},
	{
		id: "hermionegranger",
		name: "Hermione Granger",
		projects: randomProjects(),
	},
	{
		id: "millicentbulstrode",
		name: "Millicent Bulstrode",
		projects: randomProjects(),
	},
	{
		id: "vincentcrabbe",
		name: "Vincent Crabbe",
		projects: randomProjects(),
	},
	{
		id: "lavenderbrown",
		name: "Lavender Brown",
		projects: randomProjects(),
	},
	{
		id: "rogermalone",
		name: "Roger Malone",
		projects: randomProjects(),
	},
	{
		id: "seamusfinnigan",
		name: "Seamus Finnigan",
		projects: randomProjects(),
	},
	{
		id: "pansyparkinson",
		name: "Pansy Parkinson",
		projects: randomProjects(),
	},
	{
		id: "kevinentwhistle",
		name: "Kevin Entwhistle",
		projects: randomProjects(),
	},
	{
		id: "hannahabbot",
		name: "Hannah Abbot",
		projects: randomProjects(),
	},
	{
		id: "padmapatil",
		name: "Padma Patil",
		projects: randomProjects(),
	},
	{
		id: "justinfinchfletchley",
		name: "Justin Finch-Fletchley",
		projects: randomProjects(),
	},
	{
		id: "draco malfoy",
		name: "Draco Malfoy",
		projects: randomProjects(),
	},
	{
		id: "sally-anneperks",
		name: "Sally-Anne Perks",
		projects: randomProjects(),
	},
	{
		id: "blaisezabini",
		name: "Blaise Zabini",
		projects: randomProjects(),
	},
	{
		id: "erniemacmillan",
		name: "Ernie Macmillan",
		projects: randomProjects(),
	},
	{
		id: "daphnegreengrass",
		name: "Daphne Greengrass",
		projects: randomProjects(),
	},
];

const PROJECT_OPTIONS = allData.map((project) => ({ id: project.query, name: project.name }));

const PROJECT_MAP = PROJECT_OPTIONS.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.name }), {});

const ClassesProgress = () => {
	const { globalSession } = useContext(GlobalSessionContext);
	const { classObject, classLoaded } = useClass();
	const [preData, setPreData] = useState([]);
	const [viewSelect, setViewSelect] = useState(PROGRESS_VIEW_OPTIONS[0]);
	const [studentSelect, setStudentSelect] = useState();
	const [projectSelect, setProjectSelect] = useState(PROJECT_OPTIONS[0]);
	const [postData, setPostData] = useState([]);
	const [tooltip, setTooltip] = useState();
	const mp = useMixpanel();

	useEffect(async () => {
		if (!classLoaded) return;

		const filters = [
			{
				event: "project_define",
				properties: [{ schools: globalSession.groups[globalSession.recentGroups[0]].id }],
			},
		];
		const callback = (rawData) => {
			console.log(rawData);

			const processData = (step, project, licenseId, threshold = 60, subsystem) => {
				let duration = 0;
				for (let k = 0; k < rawData.length; k++) {
					if (
						rawData[k].event === `project_${step}` &&
						rawData[k].properties.project === project &&
						rawData[k].properties.licenses.includes(licenseId) &&
						(subsystem ? rawData[k].properties.subsystem === subsystem : true)
					) {
						duration += rawData[k].properties.duration;
					}
				}
				let status = "";
				let label = "Not visited";
				if (duration > threshold) {
					status = "completed";
					label = "Visited for ≥60 seconds";
				} else if (duration > 0) {
					status = "visited";
					label = "Visited for <60 seconds";
				}
				return { duration, status, label };
			};

			const processCreateData = (project, subsystems, licenseId) => {
				const createData = {};
				for (let j = 0; j < subsystems.length; j++) {
					createData[subsystems[j].title] = {
						name: subsystems[j].title,
						// TODO uncomment
						// research: processData("create_research", project, licenseId, createData[subsystems[j].research.threshold]),
						// plan: processData("create_plan", project, licenseId, createData[subsystems[j].plan.threshold]),
						// code: processData("create_code", project, licenseId, createData[subsystems[j].code.threshold]),
						research: processData("create_research", project, licenseId, 60, subsystems[j].title),
						plan: processData("create_plan", project, licenseId, 60, subsystems[j].title),
						code: processData("create_code", project, licenseId, 60, subsystems[j].title),
					};
				}
				return createData;
			};

			const _preData = classObject.students.map((student) => {
				const studentData = { id: student.licenseId, name: `${student.firstName} ${student.lastName}`, projects: {} };
				for (let i = 0; i < allData.length; i++) {
					studentData.projects[allData[i].query] = {
						define: processData("define", allData[i].query, student.licenseId, allData[i].define.threshold),
						imagine: processData("imagine", allData[i].query, student.licenseId, allData[i].imagine.threshold),
						create: processCreateData(allData[i].query, allData[i].subsystems, student.licenseId),
						// TODO uncomment
						// improve: processData("improve", allData[i].query, student.licenseId, allData[i].improve.threshold),
						improve: processData("improve", allData[i].query, student.licenseId),
					};
				}
				return studentData;
			});

			setPreData(_preData);
			setStudentSelect(_preData[0]);
		};
		await mp.read(filters, callback);
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

	console.log("pre data");
	console.log(preData);

	console.log("post data");
	console.log(postData);
	if (!postData) return null;

	return (
		<div className={`${classes.view} roundScrollbar`}>
			<Head>
				<title>Progress • {classObject.name} | CreateBase</title>
				<meta name="description" content="View your class announcements" />
			</Head>
			<div className={classes.header}>
				<h1>Progress</h1>
				<Select state={viewSelect} setState={setViewSelect} label="View" options={PROGRESS_VIEW_OPTIONS} width={100} />
				{viewSelect.id === "student" ? (
					<Select state={studentSelect} setState={setStudentSelect} label="Student" options={preData} width={150} />
				) : (
					<Select state={projectSelect} setState={setProjectSelect} label="Project" options={PROJECT_OPTIONS} width={150} />
				)}
				<HeaderToggle />
			</div>
			<ProgressTable data={postData} view={viewSelect} setTooltip={setTooltip} />
			{tooltip && (
				<div className={classes.tooltip} style={{ ...tooltip.position, ...tooltip.style }}>
					<div className={classes.tooltipTitle}>{tooltip.title}</div>
					<div className={classes.tooltipStep}>{tooltip.step}</div>
					<div className={classes[tooltip.status]}>{tooltip.label}</div>
					<div className={classes.tooltipDuration}>
						{Math.floor(tooltip.duration / 3600) ? `${Math.floor(tooltip.duration / 3600)}hr` : ""}{" "}
						{Math.floor((tooltip.duration % 3600) / 60) ? `${Math.floor((tooltip.duration % 3600) / 60)}min` : ""} {Math.floor(tooltip.duration % 60)}s
					</div>
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
