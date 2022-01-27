import { AI, AUTOMATION, COMPUTER_SCIENCE, ENGINEERING, ETHICS, TECHNOLOGY } from "../constants/projectSubjects";
import { TProject } from "../types/projects";

const SEND_IT_DATA: TProject = {
	id: "send-it",
	title: "Send It",
	subtitle: "Programmable endless runner",
	description:
		'In this Project, users will automate a jumping game by creating a simple "AI" that is able to exceed human capabilities and achieve as high of a score as possible. This AI will be controlling a robot with the task of delivering a package as fast as possible, automatically jumping over any obstacles that get in its way.',
	videoId: "wB53GoLXzME",
	scenePrefix: "Project_Jump",
	runType: "loop",
	durPerLesson: "45 mins",
	numOfLessons: 6,
	difficulty: "proficient",
	subjects: [TECHNOLOGY, ENGINEERING, COMPUTER_SCIENCE, AUTOMATION, AI, ETHICS],
	cads: {
		nz: "/projects/send-it/cads/020802AC Curriculum Alignment - Send It - NZ.pdf",
		aus: "/projects/send-it/cads/020802AC Curriculum Alignment - Send It - ACARA.pdf",
		cali: "/projects/send-it/cads/020802AC Curriculum Alignment - Send It - California.pdf",
		uk: "/projects/send-it/cads/020802AC Curriculum Alignment - Send It - England.pdf",
	},
	lessonPlan: "/projects/send-it/lesson-plan-send-it.pdf",
	learnings: [
		"Formalise the logic occurring in their head into logical code to allow them to automate a task they would normally do manually.",
		"Use flow control/branching capabilities (if, else if, else) in the Flow editor.",
		"Use comparisons and comparison blocks (<, >, <=, >, ==) in the Flow editor.",
		"Read and act on sensor data using the Flow editor.",
	],
	learningOutcomes: [
		"Formalise the logic occurring in their head into logical code to allow them to automate a task they would normally do manually.",
		"Use flow control/branching capabilities (if, else if, else) in the Flow editor.",
		"Use comparisons and comparison blocks (<, >, <=, >, ==) in the Flow editor.",
		"Read and act on sensor data using the Flow editor.",
	],
	define: {
		threshold: 60,
		md: `Dive into the situation by watching this short video.

What do you think is happening here? Discuss with your peers!`,
	},
	imagine: {
		threshold: 600,
		modules: [
			{
				type: "pdf",
				title: "Vehicular Delivery",
				url: "/projects/send-it/imagine/delivery.pdf",
			},
			{
				type: "pdf",
				title: "Your Robot has Mail",
				url: "/projects/send-it/imagine/mail.pdf",
			},
			{
				type: "pdf",
				title: "Controlling a Robot",
				url: "/projects/send-it/imagine/controlling.pdf",
			},
			{
				type: "pdf",
				title: "Sensing Sensors",
				url: "/projects/send-it/imagine/sensors.pdf",
			},
			{
				type: "pdf",
				title: "Automation & Ethics",
				url: "/projects/send-it/imagine/ethics.pdf",
			},
			{
				type: "tutorial",
				title: "How to Send It",
				items: [
					{
						src: "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/projects/send-it/gifs/tut-1.gif",
						caption: "Run 1000m to deliver the Pizza",
					},
					{
						src: "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/projects/send-it/gifs/tut-2.gif",
						caption: "Jump over obstacles to avoid crashing into them ⬆️",
					},
					{
						src: "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/projects/send-it/gifs/tut-3.gif",
						caption: "Crouch under flying obstacles to avoid crashing into them ⬇️",
					},
					{
						src: "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/projects/send-it/gifs/tut-4.gif",
						caption: "Change the simulation speed to allow more time for your code to react",
					},
				],
			},
			{
				type: "playtest",
				title: "Playtest Send It",
			},
		],
	},
	subsystems: [
		{
			title: "Obstacle avoidance",
			id: "obstacle-avoidance",
			requirements: [],
			img: "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/projects/send-it/images/thumbnail.png",
			description:
				"In a single subsystem, your task is to create a program that will tell a humanoid delivery robot the correct action to take with the correct timing when it approaches an obstacle.",
			research: {
				threshold: 600,
				caption: ["Work through the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "video",
						title: "Flow tutorial",
						videoId: "2Ndwtpk7iN8",
						description: "Get to know your way around Flow",
					},
					{
						type: "pdf",
						title: "Introduction to Flow blocks",
						url: "/projects/shared/intro-to-flow.pdf",
					},
					{
						type: "pdf",
						title: "Tips & tricks: sensing blocks",
						url: "/projects/shared/sensing-blocks.pdf",
					},
				],
			},
			plan: {
				threshold: 30,
				list: [
					"Open up your learning journal and answer all of the questions in the Plan section.",
					"If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 1200,
				tasks: ["Write some code so that your robot can detect incoming obstacles and avoid them", "Reach 1000m to deliver your package and complete the task. Good luck!"],
				hints: ["Make sure that you hit the compile button to upload your code to the robot each time that you make a change. If you don't compile your latest code, you won't see any changes!"],
			},
			blockList: [
				{
					name: "Sensing",
					blocks: [],
				},
				{
					name: "Actions",
					blocks: [],
				},
				{ name: "Operators", blocks: [] },
				{ name: "Comparisons", blocks: [] },
				{ name: "Logicals", blocks: [] },
				{ name: "Conditionals", blocks: [] },
			],
			position: {
				x: 0,
				y: 0,
			},
		},
	],
	improve: {
		threshold: 1200,
		alert: "Did you beat the game? Uh oh, looks like there's now some flying drones! And is that acceleration? Different sized obstacles too? Time to rethink your code...",
		tasks: [
			"Modify your code to duck under flying drones",
			"Modify your code to take into account an accelerating robot",
			"Modify your code to jump over obstacles of different sizes",
			"Deliver that package with the highest score possible",
		],
		hints: ["Rather than trying to solve them all at once, try turning on one modifier, updating your code until it works, and only then adding the next modifier until you have solved them all"],
		blockList: [
			{
				name: "Sensing",
				blocks: [],
			},
			{
				name: "Actions",
				blocks: [],
			},
			{ name: "Operators", blocks: [] },
			{ name: "Comparisons", blocks: [] },
			{ name: "Logicals", blocks: [] },
			{ name: "Conditionals", blocks: [] },
		],
	},
};

export default SEND_IT_DATA;
