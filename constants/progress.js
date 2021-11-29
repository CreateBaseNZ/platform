import { allData } from "../utils/getProjectData";

const generateRandom = () => {
	const strings = ["completed", "visited", "not visited"];
	const label = ["Visted for ≥60 seconds", "Visited for <60 seconds", "Not visited"];
	const randomIndex = Math.floor(Math.random() * strings.length);
	let duration;
	if (randomIndex === 0) {
		duration = Math.random() * 600 + 60;
	} else if (randomIndex === 1) {
		duration = Math.random() * 600 + 60;
	} else {
		duration = Math.random() * 60;
	}
	return { duration: duration, status: strings[randomIndex], label: label[randomIndex] };
};

const generateSubsystem = (subsystems) => {
	let ret = {};

	for (let i = 0; i < subsystems.length; i++) {
		ret[subsystems[i].title] = { research: generateRandom(), plan: generateRandom(), code: generateRandom(), name: subsystems[i].title };
	}

	return ret;
};

const randomProjects = () => {
	let ret = {};

	for (let i = 0; i < allData.length; i++) {
		ret[allData[i].query] = {
			define: generateRandom(),
			imagine: generateRandom(),
			create: generateSubsystem(allData[i].subsystems),
			improve: generateRandom(),
		};
	}

	return ret;
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

export default DUMMY_STUDENTS;
