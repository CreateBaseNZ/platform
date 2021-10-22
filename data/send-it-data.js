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

export default {
	name: "Send It",
	query: "send-it",
	caption:
		'In this project, users will automate a jumping game by creating a simple "AI" that is able to exceed human capabilities and achieve as high of a score as possible. This AI will be controlling a robot with the task of delivering a package as fast as possible, automatically jumping over any obstacles that get in its way.',
	stacked: true,
	scenePrefix: "Project_Jump",
	runType: "loop",
	durPerLesson: "45 mins",
	numOfLessons: 6,
	difficulty: "proficient",
	subjects: ["technology", "engineering", "computerScience", "automation", "ai", "ethics"],
	learningOutcome: "/send-it/project_overview.pdf",
	curriculumAlignment: "/send-it/curriculum_standards.pdf",
	lessonPlan: "/send-it/files/lesson-plan-send-it.pdf",
	learnings: [
		"Formalise the logic occurring in their head into logical code to allow them to automate a task they would normally do manually.",
		"Use flow control/branching capabilities (if, else if, else) in the Flow editor.",
		"Use comparisons and comparison blocks (<, >, <=, >, ==) in the Flow editor.",
		"Read and act on sensor data using the Flow editor.",
	],
	define: {
		url: "https://youtu.be/wB53GoLXzME",
		src: "/send-it/vid/situation.mp4",
		h1: "Dive into the situation by watching this short video.",
		h2: "What do you think is happening here? Discuss with your peers!",
		title: "Send It",
		docs: "https://docs.google.com/document/d/1BiybIT05ANt76b4rw0ArjHVHpN5LXWNxNCjavtnTM3A/edit?usp=sharing",
		word: "/send-it/files/learning-journal.docx",
	},
	imagine: {
		caption: [
			"Explore the advantages and disadvantages of automation and AI by discussing the questions in ONE of these cards with your group. Make sure to write your answers in your own learning journal. If your group finishes early, feel free to try complete a second card as well!",
			"When every group has finished, your teacher will call you back to discuss your answers and narrow in on the problem that you will be solving.",
		],
		modules: [
			{
				title: "Vehicular Delivery",
				img: "/send-it/img/types-0.png",
				url: "/send-it/pdf/delivery.pdf",
			},
			{
				title: "Your Robot has Mail",
				img: "/send-it/img/mail-2.png",
				url: "/send-it/pdf/mail.pdf",
			},
			{
				title: "Controlling a Robot",
				img: "/send-it/img/controlling-1.png",
				url: "/send-it/pdf/controlling.pdf",
			},
			{
				title: "Sensing Sensors",
				img: "/send-it/img/controlling-0.png",
				url: "/send-it/pdf/sensors.pdf",
			},
			{
				title: "Automation & Ethics",
				img: "/send-it/img/thumbnail.png",
				url: "/send-it/pdf/ethics.pdf",
			},
		],
	},
	iterations: [
		{
			research: {
				caption: ["Work through the five modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "video",
						title: "Flow tutorial",
						data: {
							url: "https://youtu.be/2Ndwtpk7iN8",
							src: "/flow-tut.mp4",
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
						type: "tut",
						title: "How to Send It",
						items: [
							{
								src: "/send-it/vid/tut-1.mp4",
								subtitle: <p>Run 1000m to deliver the Pizza</p>,
							},
							{
								src: "/send-it/vid/tut-2.mp4",
								subtitle: (
									<p>
										Jump over obstacles to avoid crashing into them
										<span className="material-icons-outlined">arrow_upward</span>
									</p>
								),
							},
							{
								src: "/send-it/vid/tut-3.mp4",
								subtitle: (
									<p>
										Crouch under flying obstacles to avoid crashing into them
										<span className="material-icons-outlined">arrow_downward</span>
									</p>
								),
							},
							{
								src: "/send-it/vid/tut-4.mp4",
								subtitle: <p>Change the simulation speed to allow more time for your code to react</p>,
							},
						],
					},
					{
						type: "explore",
						title: "Explore more",
						items: [comparisonBoostData, ifBoostData],
					},
				],
			},
			plan: [
				"Open up your learning journal and answer all of the questions in the Plan section.",
				"If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
			],
			create: {
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["Write some code so that your robot can detect incoming obstacles and avoid them", "Reach 1000m to deliver your package and complete the task. Good luck!"],
				hints: ["Make sure that you hit the compile button to upload your code to the robot"],
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
		caption: "Test what you’ve learnt by taking on more challenges. There are always ways to make your solution smarter, faster, stronger!",
		alert: "Did you beat the game? Uh oh, looks like there’s now some flying drones! And is that acceleration? Different sized obstacles too? Time to rethink your code...",
		tasks: [
			"Modify your code to duck under flying drones",
			"Modify your code to take into account an accelerating robot",
			"Modify your code to jump over obstacles of different sizes",
			"Deliver that package with the highest score possible",
		],
		hints: ["Rather than trying to do solve them all at once, try turning on one modifier, updating your code until it works, and only then adding the next modifier until you have solved them all"],
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
