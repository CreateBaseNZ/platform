import Head from "next/head";
import { useEffect, useState } from "react";
import useClass from "../../../hooks/useClass";
import ProgressTable from "../../../components/Classes/Progress/ProgressTable";
import Select from "../../../components/Classes/Progress/Select";
import InnerLayout from "../../../components/Layouts/InnerLayout/InnerLayout";
import HeaderToggle from "../../../components/Layouts/MainLayout/HeaderToggle";
import MainLayout from "../../../components/Layouts/MainLayout/MainLayout";
import { allData } from "../../../utils/getProjectData";
import CLASSES_TABS, { PROGRESS_VIEW_OPTIONS } from "../../../constants/classesConstants";

import classes from "../../../styles/classesProgress.module.scss";

const printStatus = (status) => {
	switch (status) {
		case "completed":
			return "Completed";
		case "visited":
			return "Visited for ≥ 60 seconds";
		default:
			return "Visited for < 60 seconds";
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
];
const DUMMY_STUDENTS_1 = [
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
];
const DUMMY_STUDENTS_2 = [
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

const DUMMY_CLASSES = [
	{ id: "darkarts", name: "Dark Arts", students: DUMMY_STUDENTS },
	{ id: "potions", name: "Potions", students: DUMMY_STUDENTS_1 },
	{ id: "alchemy", name: "Alchemy", students: DUMMY_STUDENTS_2 },
];

const PROJECT_OPTIONS = allData.map((project) => ({ id: project.query, name: project.name }));

const PROJECT_MAP = PROJECT_OPTIONS.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.name }), {});

const ClassesProgress = () => {
	const { classObject, classLoaded } = useClass();
	const [classSelect, setClassSelect] = useState({ isOpen: false, selected: DUMMY_CLASSES[0] });
	const [viewSelect, setViewSelect] = useState({ isOpen: false, selected: PROGRESS_VIEW_OPTIONS[0] });
	const [studentSelect, setStudentSelect] = useState({ isOpen: false, selected: classSelect.selected.students[0] });
	const [projectSelect, setProjectSelect] = useState({ isOpen: false, selected: PROJECT_OPTIONS[0] });
	const [data, setData] = useState(classSelect.selected.students);
	const [tooltip, setTooltip] = useState();

	useEffect(() => {
		if (viewSelect.selected.id === "student") {
			console.log(studentSelect);
			const student = classSelect.selected.students.find((student) => student.id === studentSelect.selected.id);
			if (student) {
				setData(Object.keys(student.projects).map((key) => ({ ...student.projects[key], id: key, name: PROJECT_MAP[key] })));
			} else {
				setStudentSelect((state) => ({ ...state, selected: classSelect.selected.students[0] }));
			}
		} else {
			setData(classSelect.selected.students.map((student) => ({ ...student.projects[projectSelect.selected.id], id: student.id, name: student.name })));
		}
	}, [classSelect.selected, viewSelect.selected, studentSelect.selected, projectSelect.selected]);

	if (!classLoaded) return null;

	return (
		<div className={`${classes.view} roundScrollbar`}>
			<Head>
				<title>Progress • {classObject.name} | CreateBase</title>
				<meta name="description" content="View your class announcements" />
			</Head>
			<div className={classes.header}>
				<h1>Progress</h1>
				<Select state={classSelect} setState={setClassSelect} label="Class" options={DUMMY_CLASSES} />
				<Select state={viewSelect} setState={setViewSelect} label="View" options={PROGRESS_VIEW_OPTIONS} width={100} />
				{viewSelect.selected.id === "student" ? (
					<Select state={studentSelect} setState={setStudentSelect} label="Student" options={classSelect.selected.students} width={150} />
				) : (
					<Select state={projectSelect} setState={setProjectSelect} label="Project" options={PROJECT_OPTIONS} width={150} />
				)}
				<HeaderToggle />
			</div>
			<ProgressTable data={data} view={viewSelect.selected} setTooltip={setTooltip} />
			{tooltip && (
				<div className={classes.tooltip} style={{ ...tooltip.position, ...tooltip.style }}>
					<div className={classes.tooltipTitle}>{tooltip.title}</div>
					<div className={classes.tooltipStep}>{tooltip.step}</div>
					<div className={classes[tooltip.status]}>{printStatus(tooltip.status)}</div>
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
