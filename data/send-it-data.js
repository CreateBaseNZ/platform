import {
	NodeSendItCrouchMini,
	NodeSendItDistanceMini,
	NodeSendItElevationOfMini,
	NodeSendItHeightOfMini,
	NodeSendItJumpMini,
	NodeSendItSpeedOfMini,
	NodeSendItWidthOfMini,
} from "../components/ReactFlow/NodeSendIt";
import { NodeGreaterThanMini, NodeLessThanMini } from "../components/ReactFlow/NodeComparisons";
import { NodeIfMini } from "../components/ReactFlow/NodeConditionals";
import { NodeAndMini, NodeOrMini } from "../components/ReactFlow/NodeLogicals";
import { NodeAddMini, NodeDivideMini, NodeMultiplyMini, NodeSubtractMini } from "../components/ReactFlow/NodeOperations";
import { comparisonBoostData, ifBoostData } from "./explore-data";
import { AI, AUTOMATION, COMPUTER_SCIENCE, ENGINEERING, ETHICS, TECHNOLOGY } from "../constants/projectSubjects";

export default {
	name: "Send It",
	query: "send-it",
	caption:
		'In this Project, users will automate a jumping game by creating a simple "AI" that is able to exceed human capabilities and achieve as high of a score as possible. This AI will be controlling a robot with the task of delivering a package as fast as possible, automatically jumping over any obstacles that get in its way.',
	stacked: true,
	scenePrefix: "Project_Jump",
	runType: "loop",
	durPerLesson: "45 mins",
	numOfLessons: 6,
	difficulty: "proficient",
	subjects: [TECHNOLOGY, ENGINEERING, COMPUTER_SCIENCE, AUTOMATION, AI, ETHICS],
	learningOutcome: "/send-it/project_overview.pdf",
	curriculumAlignment: "/send-it/020802AB Curriculum Alignment - Send It.pdf",
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
		title: "Send It",
		docs: "https://docs.google.com/document/d/1BiybIT05ANt76b4rw0ArjHVHpN5LXWNxNCjavtnTM3A/edit?usp=sharing",
		word: "/send-it/files/learning-journal-send-it.docx",
	},
	imagine: {
		threshold: 600,
		caption: [
			"Explore the advantages and disadvantages of automation and AI by discussing the questions in ONE of the first five modules below with your group. Make sure to write your answers in your own learning journal. If your group finishes early, feel free to try complete a second module as well!",
			"When every group has finished, your teacher will call you back to discuss your answers and narrow in on the problem that you will be solving.",
		],
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
			title: "Obstacle avoidance",
			requirements: [],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/send-it/img/thumbnail.png",
			description: "In a single subsystem, your task is to create a program that will tell a humanoid delivery robot the correct action to take with the correct timing when it approaches an obstacle.",
			research: {
				threshold: 600,
				caption: ["Work through the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "video",
						title: "Flow tutorial",
						data: {
							url: "https://youtu.be/2Ndwtpk7iN8",
							src: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/flow-tut.mp4",
							h1: "Flow Tutorial",
							h2: "Get to know your way around Flow",
							title: "Flow Tutorial",
						},
					},
					{
						type: "pdf",
						title: "Introduction to Flow blocks",
						url: "/intro-to-flow.pdf",
					},
					{
						type: "pdf",
						title: "Tips & tricks: sensing blocks",
						url: "/sensing-blocks.pdf",
					},
					{
						type: "explore",
						title: "Explore more",
						items: [comparisonBoostData, ifBoostData],
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
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
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
		caption: "Test what you’ve learnt by taking on more challenges. There are always ways to make your solution smarter, faster, stronger!",
		alert: "Did you beat the game? Uh oh, looks like there’s now some flying drones! And is that acceleration? Different sized obstacles too? Time to rethink your code...",
		tasks: [
			"Modify your code to duck under flying drones",
			"Modify your code to take into account an accelerating robot",
			"Modify your code to jump over obstacles of different sizes",
			"Deliver that package with the highest score possible",
		],
		hints: ["Rather than trying to solve them all at once, try turning on one modifier, updating your code until it works, and only then adding the next modifier until you have solved them all"],
		code: true,
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
