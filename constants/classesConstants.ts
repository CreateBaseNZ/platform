import { IInnerLayoutTab, IInnerLayoutTabObject } from "../types/layouts";
import { ALL_PROJECTS_ARRAY } from "./projects";
import { generateRandomProgress, generateStudentData } from "../utils/generateDummyClassData";

const tabs: IInnerLayoutTab[] = [
	{ title: "Progress", name: "progress", icon: "table_chart", pathname: "/classes/[id]/progress" },
	// { title: "Reporting", name: "reporting", icon: "pending_actions", pathname: "/classes/[id]/reporting" },
	{ title: "Manage Members", name: "manage", icon: "manage_accounts", pathname: "/classes/[id]/manage-members" },
	{ title: "Settings", name: "settings", icon: "tune", pathname: "/classes/[id]/settings" },
	// { title: "Announcements (Coming Soon!)", name: "announcements", icon: "campaign", pathname: "/classes/[id]/announcements", todo: true },
	// { title: "Assignments (Coming Soon!)", name: "assignments", icon: "assignment", pathname: "/classes/[id]/assignments", todo: true },
	// { title: "Engagement (Coming Soon!)", name: "engagement", icon: "stacked_bar_chart", pathname: "/classes/[id]/engagement", todo: true },
];

const CLASSES_TABS: IInnerLayoutTabObject = {
	admin: tabs,
	teacher: tabs,
	student: [],
};

export default CLASSES_TABS;

export const MANAGE_MEMBERS_COLUMNS = [
	{ Header: "First Name", accessor: "firstName", style: { width: "25%", cursor: "pointer" } },
	{ Header: "Last Name", accessor: "lastName", style: { width: "25%", cursor: "pointer" } },
	{ Header: "Email", accessor: "email", style: { cursor: "pointer" } },
];

export const MANAGE_MEMBERS_SIZES = [10, 20, 50, 100];

export const PROJECT_OPTIONS = ALL_PROJECTS_ARRAY.map((project) => ({ id: project.id, name: project.title }));

export const PROJECT_MAP = PROJECT_OPTIONS.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.name }), {});

export const PROGRESS_VIEW_OPTIONS = [
	{ id: "project", name: "Project" },
	{ id: "student", name: "Student" },
];

export const REPORTING_VIEW_OPTIONS = [
	{ id: "project", name: "Project" },
	{ id: "student", name: "Student" },
];

const DUMMY_STUDENTS = [
	{ id: "sophieroper", name: "Sophie Roper" },
	{ id: "mandybrocklehurst", name: "Mandy Brocklehurst" },
	{ id: "isobelmacdougal", name: "Isabel MacDougal" },
	{ id: "anthonygoldstein", name: "Anthony Goldstein" },
	{ id: "parvatipatil", name: "Parvati Patil" },
	{ id: "runcorn", name: "Runcorn" },
	{ id: "sallysmith", name: "Sally Smith" },
	{ id: "ronaldweasley", name: "Ronald Weasley" },
	{ id: "michaelcorner", name: "Michael Corner" },
	{ id: "lilymoon", name: "Lily Moon" },
	{ id: "traceydavis", name: "Tracey Davis" },
	{ id: "nevillelongbottom", name: "Neville Longbottom" },
	{ id: "harrypotter", name: "Harry Potter" },
	{ id: "susanbones", name: "Susan Bones" },
	{ id: "gregorygoyle", name: "Gregory Goyle" },
	{ id: "oliverrivers", name: "Oliver Rivers" },
	{ id: "theodorenott", name: "Theodore Nott" },
	{ id: "lisaturpin", name: "Lisa Turpin" },
	{ id: "waynehopkins", name: "Wayne Hipkins" },
	{ id: "deanthomas", name: "Dean Thomas" },
	{ id: "meganjones", name: "Megan Jones" },
	{ id: "sueli", name: "Sue Li" },
	{ id: "terryboot", name: "Terry Boot" },
	{ id: "stephencornfoot", name: "Stephen Cornfoot" },
	{ id: "hermionegranger", name: "Hermione Granger" },
	{ id: "millicentbulstrode", name: "Millicent Bulstrode" },
	{ id: "vincentcrabbe", name: "Vincent Crabbe" },
	{ id: "lavenderbrown", name: "Lavender Brown" },
	{ id: "rogermalone", name: "Roger Malone" },
	{ id: "seamusfinnigan", name: "Seamus Finnigan" },
	{ id: "pansyparkinson", name: "Pansy Parkinson" },
	{ id: "kevinentwhistle", name: "Kevin Entwhistle" },
	{ id: "hannahabbot", name: "Hannah Abbot" },
	{ id: "padmapatil", name: "Padma Patil" },
	{ id: "justinfinchfletchley", name: "Justin Finch-Fletchley" },
	{ id: "draco malfoy", name: "Draco Malfoy" },
	{ id: "sally-anneperks", name: "Sally-Anne Perks" },
	{ id: "blaisezabini", name: "Blaise Zabini" },
	{ id: "erniemacmillan", name: "Ernie Macmillan" },
	{ id: "daphnegreengrass", name: "Daphne Greengrass" },
];

export const DUMMY_PROGRESS_DATA = DUMMY_STUDENTS.map((student) => ({ ...student, projects: generateStudentData(generateRandomProgress) }));

const generateRandomReporting = () => {
	return [{ start: 1639561834632, end: 1639562299020 }];
};

export const DUMMY_REPORTING_DATA = DUMMY_STUDENTS.map((student) => ({ ...student, projects: generateStudentData(generateRandomReporting) }));

export const Y_LABEL_WIDTH = 200;
export const HOUR_WIDTH = 60;
export const INTERVAL_WIDTH = 3 * HOUR_WIDTH;
export const SAFE_MARGIN = 16;
