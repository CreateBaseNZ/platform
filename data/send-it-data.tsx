import {
	NodeSendItCrouchMini,
	NodeSendItDistanceMini,
	NodeSendItElevationOfMini,
	NodeSendItHeightOfMini,
	NodeSendItJumpMini,
	NodeSendItSpeedOfMini,
	NodeSendItWidthOfMini,
} from "../components/Nodes/NodeSendIt";
import { NodeGreaterThanMini, NodeLessThanMini } from "../components/Nodes/NodeComparisons";
import { NodeIfMini } from "../components/Nodes/NodeConditionals";
import { NodeAndMini, NodeOrMini } from "../components/Nodes/NodeLogicals";
import { NodeAddMini, NodeDivideMini, NodeMultiplyMini, NodeSubtractMini } from "../components/Nodes/NodeOperations";
import { comparisonBoostData, ifBoostData } from "./explore-data";
import { AI, AUTOMATION, COMPUTER_SCIENCE, ENGINEERING, ETHICS, TECHNOLOGY } from "../constants/projectSubjects";
import { IProjectReadOnly } from "../types/projects";

const SEND_IT_DATA: IProjectReadOnly = {
	name: "Send It",
	query: "send-it",
	wip: true,
	caption:
		'In this Project, users will automate a jumping game by creating a simple "AI" that is able to exceed human capabilities and achieve as high of a score as possible. This AI will be controlling a robot with the task of delivering a package as fast as possible, automatically jumping over any obstacles that get in its way.',
	stacked: true,
	documentation: "https://docs.google.com/document/d/1xAhje5B6cLefSjgddEHlziMfVQt1Tj5QQzT4cDNUVgg/edit?usp=sharing",
	scenePrefix: "Project_Jump",
	runType: "loop",
	durPerLesson: "45 mins",
	numOfLessons: 6,
	difficulty: "proficient",
	subjects: [TECHNOLOGY, ENGINEERING, COMPUTER_SCIENCE, AUTOMATION, AI, ETHICS],
	learningOutcome: "/send-it/files/project-overview-send-it.pdf",
	cads: {
		nz: "/send-it/cads/020802AC Curriculum Alignment - Send It - NZ.pdf",
		aus: "/send-it/cads/020802AC Curriculum Alignment - Send It - ACARA.pdf",
		cali: "/send-it/cads/020802AC Curriculum Alignment - Send It - California.pdf",
		uk: "/send-it/cads/020802AC Curriculum Alignment - Send It - England.pdf",
	},
	lessonPlan: "/send-it/files/lesson-plan-send-it.pdf",
	learnings: [
		"Formalise the logic occurring in their head into logical code to allow them to automate a task they would normally do manually.",
		"Use flow control/branching capabilities (if, else if, else) in the Flow editor.",
		"Use comparisons and comparison blocks (<, >, <=, >, ==) in the Flow editor.",
		"Read and act on sensor data using the Flow editor.",
	],
	define: {
		threshold: 60,
		url: "https://youtu.be/wB53GoLXzME",
		src: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/send-it/vid/situation.mp4",
		h1: "Dive into the situation by watching this short video.",
		h2: "What do you think is happening here? Discuss with your peers!",
		docs: "https://docs.google.com/document/d/1RODSWsBmfx-LaCL7lAArenwNX60WvYvs8SCCKIXYis8/edit?usp=sharing",
		word: "/send-it/files/0209AA Send it Learning Journal.docx",
	},
	imagine: {
		threshold: 600,
		modules: [
			{
				type: "pdf",
				title: "Vehicular Delivery",
				img: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/send-it/img/types-0.png",
				url: "/send-it/pdf/delivery.pdf",
			},
			{
				type: "pdf",
				title: "Your Robot has Mail",
				img: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/send-it/img/mail-2.png",
				url: "/send-it/pdf/mail.pdf",
			},
			{
				type: "pdf",
				title: "Controlling a Robot",
				img: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/send-it/img/controlling-1.png",
				url: "/send-it/pdf/controlling.pdf",
			},
			{
				type: "pdf",
				title: "Sensing Sensors",
				img: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/send-it/img/controlling-0.png",
				url: "/send-it/pdf/sensors.pdf",
			},
			{
				type: "pdf",
				title: "Automation & Ethics",
				img: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/send-it/img/thumbnail.png",
				url: "/send-it/pdf/ethics.pdf",
			},
			{
				type: "tut",
				title: "How to Send It",
				items: [
					{
						src: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/send-it/vid/tut-1.mp4",
						subtitle: <p>Run 1000m to deliver the Pizza</p>,
					},
					{
						src: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/send-it/vid/tut-2.mp4",
						subtitle: (
							<p>
								Jump over obstacles to avoid crashing into them
								<span className="material-icons-outlined">arrow_upward</span>
							</p>
						),
					},
					{
						src: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/send-it/vid/tut-3.mp4",
						subtitle: (
							<p>
								Crouch under flying obstacles to avoid crashing into them
								<span className="material-icons-outlined">arrow_downward</span>
							</p>
						),
					},
					{
						src: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/send-it/vid/tut-4.mp4",
						subtitle: <p>Change the simulation speed to allow more time for your code to react</p>,
					},
				],
			},
		],
	},
	subsystems: [
		{
			title: "Jumping",
			requirements: [],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/send-it/img/thumbnail.png",
			description:
				"In a single subsystem, your task is to create a program that will tell a humanoid delivery robot the correct action to take with the correct timing when it approaches an obstacle.",
			research: {
				threshold: 600,
				caption: ["Your learning journal will guide you through completing either the Flow or the JS modules below.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "video",
						title: "Flow: Editor tutorial",
						data: {
							url: "https://youtu.be/2Ndwtpk7iN8",
							src: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/flow-tut.mp4",
							h1: "Flow Tutorial",
							h2: "Get to know your way around Flow",
						},
					},
					{
						type: "pdf",
						title: "Flow: Introduction to blocks",
						img: "",
						url: "/intro-to-flow.pdf",
					},
					{
						type: "pdf",
						title: "Flow: Tips & tricks with sensing blocks",
						img: "",
						url: "/send-it/pdf/sensing-blocks.pdf",
					},
					{
						type: "pdf",
						title: "JS: Introduction to JavaScript",
						img: "",
						url: "/send-it/pdf/intro_to_JS.pdf",
					},
					{
						type: "pdf",
						title: "JS: Tips & tricks with sensing functions",
						img: "",
						url: "/send-it/pdf/sensing_functions.pdf",
					},
					// comment out until fixed 
					/*{
						type: "explore",
						title: "Explore more",
						items: [comparisonBoostData, ifBoostData],
					}, */
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
					blocks: [<NodeSendItDistanceMini />, <NodeSendItElevationOfMini />, <NodeSendItHeightOfMini />, <NodeSendItWidthOfMini />, <NodeSendItSpeedOfMini />],
				},
				{
					name: "Actions",
					blocks: [<NodeSendItJumpMini />, <NodeSendItCrouchMini />],
				},
				{ name: "Operators", blocks: [<NodeAddMini />, <NodeSubtractMini />, <NodeMultiplyMini />, <NodeDivideMini />] },
				{ name: "Comparisons", blocks: [<NodeLessThanMini />, <NodeGreaterThanMini />] },
				{ name: "Logicals", blocks: [<NodeAndMini />, <NodeOrMini />] },
				{ name: "Conditionals", blocks: [<NodeIfMini />] },
			],
		},
		{
			title: "Precision Jumping",
			requirements: [],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/send-it/img/thumbnail.png",
			description:
				"In a single subsystem, your task is to create a program that will tell a humanoid delivery robot the correct action to take with the correct timing when it approaches an obstacle.",
			research: {
				threshold: 600,
				caption: ["Your learning journal will guide you through completing either the Flow or the JS modules below.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "video",
						title: "Flow: Editor tutorial",
						data: {
							url: "https://youtu.be/2Ndwtpk7iN8",
							src: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/flow-tut.mp4",
							h1: "Flow Tutorial",
							h2: "Get to know your way around Flow",
						},
					},
					{
						type: "pdf",
						title: "Flow: Introduction to blocks",
						img: "",
						url: "/intro-to-flow.pdf",
					},
					{
						type: "pdf",
						title: "Flow: Tips & tricks with sensing blocks",
						img: "",
						url: "/send-it/pdf/sensing-blocks.pdf",
					},
					{
						type: "pdf",
						title: "JS: Introduction to JavaScript",
						img: "",
						url: "/send-it/pdf/intro_to_JS.pdf",
					},
					{
						type: "pdf",
						title: "JS: Tips & tricks with sensing functions",
						img: "",
						url: "/send-it/pdf/sensing_functions.pdf",
					},
					// comment out until fixed 
					/*{
						type: "explore",
						title: "Explore more",
						items: [comparisonBoostData, ifBoostData],
					}, */
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
					blocks: [<NodeSendItDistanceMini />, <NodeSendItElevationOfMini />, <NodeSendItHeightOfMini />, <NodeSendItWidthOfMini />, <NodeSendItSpeedOfMini />],
				},
				{
					name: "Actions",
					blocks: [<NodeSendItJumpMini />, <NodeSendItCrouchMini />],
				},
				{ name: "Operators", blocks: [<NodeAddMini />, <NodeSubtractMini />, <NodeMultiplyMini />, <NodeDivideMini />] },
				{ name: "Comparisons", blocks: [<NodeLessThanMini />, <NodeGreaterThanMini />] },
				{ name: "Logicals", blocks: [<NodeAndMini />, <NodeOrMini />] },
				{ name: "Conditionals", blocks: [<NodeIfMini />] },
			],
		},
		{
			title: "Crouching",
			requirements: [],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/send-it/img/thumbnail.png",
			description:
				"In a single subsystem, your task is to create a program that will tell a humanoid delivery robot the correct action to take with the correct timing when it approaches an obstacle.",
			research: {
				threshold: 600,
				caption: ["Your learning journal will guide you through completing either the Flow or the JS modules below.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "video",
						title: "Flow: Editor tutorial",
						data: {
							url: "https://youtu.be/2Ndwtpk7iN8",
							src: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/flow-tut.mp4",
							h1: "Flow Tutorial",
							h2: "Get to know your way around Flow",
						},
					},
					{
						type: "pdf",
						title: "Flow: Introduction to blocks",
						img: "",
						url: "/intro-to-flow.pdf",
					},
					{
						type: "pdf",
						title: "Flow: Tips & tricks with sensing blocks",
						img: "",
						url: "/send-it/pdf/sensing-blocks.pdf",
					},
					{
						type: "pdf",
						title: "JS: Introduction to JavaScript",
						img: "",
						url: "/send-it/pdf/intro_to_JS.pdf",
					},
					{
						type: "pdf",
						title: "JS: Tips & tricks with sensing functions",
						img: "",
						url: "/send-it/pdf/sensing_functions.pdf",
					},
					// comment out until fixed 
					/*{
						type: "explore",
						title: "Explore more",
						items: [comparisonBoostData, ifBoostData],
					}, */
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
					blocks: [<NodeSendItDistanceMini />, <NodeSendItElevationOfMini />, <NodeSendItHeightOfMini />, <NodeSendItWidthOfMini />, <NodeSendItSpeedOfMini />],
				},
				{
					name: "Actions",
					blocks: [<NodeSendItJumpMini />, <NodeSendItCrouchMini />],
				},
				{ name: "Operators", blocks: [<NodeAddMini />, <NodeSubtractMini />, <NodeMultiplyMini />, <NodeDivideMini />] },
				{ name: "Comparisons", blocks: [<NodeLessThanMini />, <NodeGreaterThanMini />] },
				{ name: "Logicals", blocks: [<NodeAndMini />, <NodeOrMini />] },
				{ name: "Conditionals", blocks: [<NodeIfMini />] },
			],
		},
		{
			title: "Acceleration",
			requirements: [],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/send-it/img/thumbnail.png",
			description:
				"In a single subsystem, your task is to create a program that will tell a humanoid delivery robot the correct action to take with the correct timing when it approaches an obstacle.",
			research: {
				threshold: 600,
				caption: ["Your learning journal will guide you through completing either the Flow or the JS modules below.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "video",
						title: "Flow: Editor tutorial",
						data: {
							url: "https://youtu.be/2Ndwtpk7iN8",
							src: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/flow-tut.mp4",
							h1: "Flow Tutorial",
							h2: "Get to know your way around Flow",
						},
					},
					{
						type: "pdf",
						title: "Flow: Introduction to blocks",
						img: "",
						url: "/intro-to-flow.pdf",
					},
					{
						type: "pdf",
						title: "Flow: Tips & tricks with sensing blocks",
						img: "",
						url: "/send-it/pdf/sensing-blocks.pdf",
					},
					{
						type: "pdf",
						title: "JS: Introduction to JavaScript",
						img: "",
						url: "/send-it/pdf/intro_to_JS.pdf",
					},
					{
						type: "pdf",
						title: "JS: Tips & tricks with sensing functions",
						img: "",
						url: "/send-it/pdf/sensing_functions.pdf",
					},
					// comment out until fixed 
					/*{
						type: "explore",
						title: "Explore more",
						items: [comparisonBoostData, ifBoostData],
					}, */
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
					blocks: [<NodeSendItDistanceMini />, <NodeSendItElevationOfMini />, <NodeSendItHeightOfMini />, <NodeSendItWidthOfMini />, <NodeSendItSpeedOfMini />],
				},
				{
					name: "Actions",
					blocks: [<NodeSendItJumpMini />, <NodeSendItCrouchMini />],
				},
				{ name: "Operators", blocks: [<NodeAddMini />, <NodeSubtractMini />, <NodeMultiplyMini />, <NodeDivideMini />] },
				{ name: "Comparisons", blocks: [<NodeLessThanMini />, <NodeGreaterThanMini />] },
				{ name: "Logicals", blocks: [<NodeAndMini />, <NodeOrMini />] },
				{ name: "Conditionals", blocks: [<NodeIfMini />] },
			],
			
		},
		{
			title: "Putting it all together",
			requirements: [],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/send-it/img/thumbnail.png",
			description:
				"In a single subsystem, your task is to create a program that will tell a humanoid delivery robot the correct action to take with the correct timing when it approaches an obstacle.",
			research: {
				threshold: 600,
				caption: ["Your learning journal will guide you through completing either the Flow or the JS modules below.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "video",
						title: "Flow: Editor tutorial",
						data: {
							url: "https://youtu.be/2Ndwtpk7iN8",
							src: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/flow-tut.mp4",
							h1: "Flow Tutorial",
							h2: "Get to know your way around Flow",
						},
					},
					{
						type: "pdf",
						title: "Flow: Introduction to blocks",
						img: "",
						url: "/intro-to-flow.pdf",
					},
					{
						type: "pdf",
						title: "Flow: Tips & tricks with sensing blocks",
						img: "",
						url: "/send-it/pdf/sensing-blocks.pdf",
					},
					{
						type: "pdf",
						title: "JS: Introduction to JavaScript",
						img: "",
						url: "/send-it/pdf/intro_to_JS.pdf",
					},
					{
						type: "pdf",
						title: "JS: Tips & tricks with sensing functions",
						img: "",
						url: "/send-it/pdf/sensing_functions.pdf",
					},
					// comment out until fixed 
					/*{
						type: "explore",
						title: "Explore more",
						items: [comparisonBoostData, ifBoostData],
					}, */
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
					blocks: [<NodeSendItDistanceMini />, <NodeSendItElevationOfMini />, <NodeSendItHeightOfMini />, <NodeSendItWidthOfMini />, <NodeSendItSpeedOfMini />],
				},
				{
					name: "Actions",
					blocks: [<NodeSendItJumpMini />, <NodeSendItCrouchMini />],
				},
				{ name: "Operators", blocks: [<NodeAddMini />, <NodeSubtractMini />, <NodeMultiplyMini />, <NodeDivideMini />] },
				{ name: "Comparisons", blocks: [<NodeLessThanMini />, <NodeGreaterThanMini />] },
				{ name: "Logicals", blocks: [<NodeAndMini />, <NodeOrMini />] },
				{ name: "Conditionals", blocks: [<NodeIfMini />] },
			],
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
				blocks: [<NodeSendItDistanceMini />, <NodeSendItElevationOfMini />, <NodeSendItHeightOfMini />, <NodeSendItWidthOfMini />, <NodeSendItSpeedOfMini />],
			},
			{
				name: "Actions",
				blocks: [<NodeSendItJumpMini />, <NodeSendItCrouchMini />],
			},
			{ name: "Operators", blocks: [<NodeAddMini />, <NodeSubtractMini />, <NodeMultiplyMini />, <NodeDivideMini />] },
			{ name: "Comparisons", blocks: [<NodeLessThanMini />, <NodeGreaterThanMini />] },
			{ name: "Logicals", blocks: [<NodeAndMini />, <NodeOrMini />] },
			{ name: "Conditionals", blocks: [<NodeIfMini />] },
		],
	},
};

export default SEND_IT_DATA;
