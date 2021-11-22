import {
	NodeAimBotGetYawAngleMini,
	NodeAimBotGetPitchAngleMini,
	NodeAimBotGetMosquitoXPosMini,
	NodeAimBotGetMosquitoYPosMini,
	NodeAimBotGetMosquitoZPosMini,
	NodeAimBotSetYawSpeedMini,
	NodeAimBotSetPitchSpeedMini,
	NodeAimBotShootMini,
	NodeAimBotSetCurrentYawSpeedMini,
	NodeAimBotSetCurrentPitchSpeedMini,
	NodeAimBotGetCurrentYawSpeedMini,
	NodeAimBotGetCurrentPitchSpeedMini,
} from "../components/ReactFlow/NodeAimbot";
import { NodeGreaterThanMini, NodeLessThanMini } from "../components/ReactFlow/NodeComparisons";
import { NodeIfMini } from "../components/ReactFlow/NodeConditionals";
import { NodeAndMini, NodeOrMini } from "../components/ReactFlow/NodeLogicals";
import { NodeAddMini, NodeDivideMini, NodeMultiplyMini, NodeSubtractMini, NodeArcTanMini, NodePIMini, NodeSqrtMini, NodeClampMini } from "../components/ReactFlow/NodeOperations";
import { comparisonBoostData, ifBoostData } from "./explore-data";
import { NodePrintMini } from "../components/ReactFlow/NodeUtils";
import { COMPUTER_SCIENCE, ENGINEERING, TRIGONOMETRY, SCRIPTING } from "../constants/projectSubjects";

export default {
	name: "AimBot (WIP)",
	query: "aimbot",
	caption: "TBD",
	stacked: true,
	scenePrefix: "Project_Aimbot",
	runType: "loop",
	durPerLesson: "45 mins",
	numOfLessons: 7,
	difficulty: "Proficient",
	subjects: [COMPUTER_SCIENCE, SCRIPTING, TRIGONOMETRY, ENGINEERING],
	learningOutcome: "TBD",
	curriculumAlignment: "TBD",
	lessonPlan: "TBD",
	learnings: [
		"Use and track multiple variables throughout a program.",
		"Use while loops to continually perform micro-actions.",
		"Apply trigonometry to calculate angles in a 2-dimensional plane.",
		"Apply trigonometry to 3-dimensional space.",
		"Apply control systems theory to a control plant.",
	],
	define: {
		url: "https://www.youtube.com/watch?v=znMZhBSDW_I",
		src: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/aimbot/vid/situation.mp4",
		h1: "Dive into the situation by watching this short video.",
		h2: "Your first step to begin solving this problem is to download either of the learning journals below, saving a copy for yourself. Your learning journal will guide you through the Project and serves as a place to document your progress.",
		title: "TBD",
		docs: "https://docs.google.com/document/d/1UTyQpsp9bAAdAiJFq9vbNVb7Cy1PoW2x57Sv5YgTYnM/edit#",
		word: "https://docs.google.com/document/d/1UTyQpsp9bAAdAiJFq9vbNVb7Cy1PoW2x57Sv5YgTYnM/edit#",
	},
	imagine: {
		caption: [
			"As a class, dive into group discussions around the Project theme to fully define our problem.",
			"Your educator will let you know if they want you to answer these questions in your learning journal individually, as a group, or as a class discussion.",
		],
		modules: [
			{
				title: "In this Project...",
				img: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/aimbot/img/thumbnail.png",
				url: "/aimbot/files/21050502AA_imagine.pdf",
			},
		],
	},
	subsystems: [
		{
			title: "Subsystem 1",
			requirements: [],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/aimbot/img/thumbnail.png", // TODO
			description: "In this subsystem, we will restrict the movement of the mosquito and our arm to a single dimension. We will need to use sensor data to calculate where we should aim, move our arm to that position, and then activate the laser!",
			research: {
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to code your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Axis, Pitch and Yaw",
						url: "/aimbot/pdf/2105050301AA_research_pitch_yaw_axis.pdf",
					},
					{
						type: "pdf",
						title: "Trigonometry",
						url: "/aimbot/pdf/2105050301AB_research_trigonometry.pdf",
					},
					{
						type: "pdf",
						title: "Introduction to Flow Part I",
						url: "/aimbot/pdf/2105050301AC_research_1_blocks.pdf",
					},
				],
			},
			plan: [
				"In this first subsystem, our aim is to understand how to calculate how far we need to move our arm to aim at the next mosquito. We will then perform a movement before firing the laser at the mosquito.",
				"To do this, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section for subsystem 1. If you get stuck, your educator may let you ask your classmates for help, but don't forget to explain your own reasoning!",
			],
			code: {
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: [
					"Mosquitos will be appearing across your screen in a horizontal line.",
					"You need to find the position of each mosquito, aim your robot by controlling its yaw angle, and then fire to destroy all of the mosquitos.",
					"If you aim too slowly, the mosquitos will disappear! Make sure that you turn your robot quickly."
				],
				hints: [
					"You will need to use the x coordinate of the mosquitos to calculate the angle that you need to aim at using trigonometry.", 
					"You can aim by controlling the velocity of the motors in the robot's arm.",
					"Too avoid overshooting your target, you may want to have a dynamic velocity where you slow down your speed as you get close to your target.",
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it for future steps."
				],
			},
			blockList: [
				{ name: "Variables", blocks: [<NodeAimBotGetCurrentPitchSpeedMini />, <NodeAimBotGetCurrentYawSpeedMini />, <NodeAimBotSetCurrentPitchSpeedMini />, <NodeAimBotSetCurrentYawSpeedMini />] },
				{ name: "Sensing", blocks: [<NodeAimBotGetYawAngleMini />, <NodeAimBotGetMosquitoXPosMini />, <NodeAimBotGetMosquitoZPosMini />] },
				{ name: "Actions", blocks: [<NodeAimBotSetYawSpeedMini />, <NodeAimBotShootMini />] },
				{ name: "Operators", blocks: [<NodeAddMini />, <NodeSubtractMini />, <NodeMultiplyMini />, <NodeDivideMini />, <NodeArcTanMini />, <NodePIMini />, <NodeClampMini />] },
				{ name: "Comparisons", blocks: [<NodeLessThanMini />, <NodeGreaterThanMini />] },
				{ name: "Logicals", blocks: [<NodeAndMini />, <NodeOrMini />] },
				{ name: "Conditionals", blocks: [<NodeIfMini />] },
				{ name: "Utilities", blocks: [<NodePrintMini />] },
			],
		},
		{
			title: "Subsystem 2",
			requirements: ["Subsystem 1"],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/aimbot/img/thumbnail.png", // TODO
			description: "Let's expand our problem from subsystem 1 to include a second dimension! We will be copying our answer from the previous code but adding pitch motor controls.",
			research: {
				caption: ["There is no new research for this sub-problem. Move onto Plan."],
				modules: [
					{
						type: "pdf",
						title: "Introduction to Flow blocks 2",
						url: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/aimbot/pdf/2105050301AD_research_2_blocks.pdf",
					},
				],
			},
			plan: ["TBD"],
			code: {
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["TBD"],
				hints: ["TBD", "Click the save button in the bottom left menu when you have finished writing your code so that you can access it for future steps."],
			},
			blockList: [
				{
					name: "Sensing",
					blocks: [<NodeAimBotGetYawAngleMini />, <NodeAimBotGetPitchAngleMini />, <NodeAimBotGetMosquitoXPosMini />, <NodeAimBotGetMosquitoYPosMini />, <NodeAimBotGetMosquitoZPosMini />],
				},
				{ name: "Actions", blocks: [<NodeAimBotSetYawSpeedMini />, <NodeAimBotSetPitchSpeedMini />, <NodeAimBotShootMini />] },
				{ name: "Operators", blocks: [<NodeAddMini />, <NodeSubtractMini />, <NodeMultiplyMini />, <NodeDivideMini />, <NodeArcTanMini />, <NodePIMini />, <NodeSqrtMini />] },
				{ name: "Comparisons", blocks: [<NodeLessThanMini />, <NodeGreaterThanMini />] },
				{ name: "Logicals", blocks: [<NodeAndMini />, <NodeOrMini />] },
				{ name: "Conditionals", blocks: [<NodeIfMini />] },
				{ name: "Utilities", blocks: [<NodePrintMini />] },
			],
		},
		{
			title: "Subsystem 3",
			requirements: ["Subsystem 1"],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/aimbot/img/thumbnail.png", // TODO
			description: "In this subsystem, we will try and make our solution to the first subsystem more realistic by incorporating forces and a breakable arm.",
			research: {
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to code your solution!"],
				modules: [],
			},
			plan: ["TBD"],
			code: {
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["TBD"],
				hints: ["TBD", "Click the save button in the bottom left menu when you have finished writing your code so that you can access it for future steps."],
			},
			blockList: [
				{ name: "Variables", blocks: [<NodeAimBotGetCurrentPitchSpeedMini />, <NodeAimBotGetCurrentYawSpeedMini />, <NodeAimBotSetCurrentPitchSpeedMini />, <NodeAimBotSetCurrentYawSpeedMini />] },
				{ name: "Sensing", blocks: [<NodeAimBotGetYawAngleMini />, <NodeAimBotGetMosquitoXPosMini />, <NodeAimBotGetMosquitoZPosMini />] },
				{ name: "Actions", blocks: [<NodeAimBotSetYawSpeedMini />, <NodeAimBotShootMini />] },
				{ name: "Operators", blocks: [<NodeAddMini />, <NodeSubtractMini />, <NodeMultiplyMini />, <NodeDivideMini />, <NodeArcTanMini />, <NodePIMini />, <NodeClampMini />] },
				{ name: "Comparisons", blocks: [<NodeLessThanMini />, <NodeGreaterThanMini />] },
				{ name: "Logicals", blocks: [<NodeAndMini />, <NodeOrMini />] },
				{ name: "Conditionals", blocks: [<NodeIfMini />] },
				{ name: "Utilities", blocks: [<NodePrintMini />] },
			],
		},
		{
			title: "Subsystem 4",
			requirements: ["Subsystem 2", "Subsystem 3"],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/aimbot/img/thumbnail.png", // TODO
			description: "Lets put together everything that we have learnt to program a solution to the full problem!",
			research: {
				caption: ["There is no new research for this sub-problem. Move directly to Plan. Do not pass Go. Do not collect $100."],
				modules: [],
			},
			plan: ["TBD"],
			code: {
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["TBD"],
				hints: ["TBD", "Click the save button in the bottom left menu when you have finished writing your code so that you can access it for future steps."],
			},
			blockList: [
				{ name: "Variables", blocks: [<NodeAimBotGetCurrentPitchSpeedMini />, <NodeAimBotGetCurrentYawSpeedMini />, <NodeAimBotSetCurrentPitchSpeedMini />, <NodeAimBotSetCurrentYawSpeedMini />] },
				{
					name: "Sensing",
					blocks: [<NodeAimBotGetYawAngleMini />, <NodeAimBotGetPitchAngleMini />, <NodeAimBotGetMosquitoXPosMini />, <NodeAimBotGetMosquitoYPosMini />, <NodeAimBotGetMosquitoZPosMini />],
				},
				{ name: "Actions", blocks: [<NodeAimBotSetYawSpeedMini />, <NodeAimBotSetPitchSpeedMini />, <NodeAimBotShootMini />] },
				{ name: "Operators", blocks: [<NodeAddMini />, <NodeSubtractMini />, <NodeMultiplyMini />, <NodeDivideMini />, <NodeArcTanMini />, <NodePIMini />, <NodeSqrtMini />, <NodeClampMini />] },
				{ name: "Comparisons", blocks: [<NodeLessThanMini />, <NodeGreaterThanMini />] },
				{ name: "Logicals", blocks: [<NodeAndMini />, <NodeOrMini />] },
				{ name: "Conditionals", blocks: [<NodeIfMini />] },
				{ name: "Utilities", blocks: [<NodePrintMini />] },
			],
		},
	],
	improve: {
		caption: "Test what you’ve learnt by taking on more challenges. There are always ways to make your solution smarter, faster, stronger!",
		alert: "Congratulations! You now have a solution that will destroy any mosquitos that cross the path of your robot! Mosquitos everywhere will be trembling in fear! We have now added a timer to the simulation that will measure how long it takes your robot to find and destroy all of the mosquitos.",
		tasks: [
			"Mosquitos will be appearing across your screen in both the x and y directions.",
			"You will need to find the position of each mosquito, aim your robot, and then fire to destroy all of the mosquitos, just like in the Create step.",
			"You will need to move your arm as fast as possible to get the fastest possible time.",
			"Compete with your peers to get the fastest time."
		],
		hints: [
			"If you set the speed of your arm too high, you may overshoot your targets.",
			"The best way to decrease your time will be to optimise your controller.",
			"Don't forget to take a screenshot of your best time and paste it into your learning journal for proof!"
		],
		code: true,
		blockList: [
			{ name: "Variables", blocks: [<NodeAimBotGetCurrentPitchSpeedMini />, <NodeAimBotGetCurrentYawSpeedMini />, <NodeAimBotSetCurrentPitchSpeedMini />, <NodeAimBotSetCurrentYawSpeedMini />] },
			{
				name: "Sensing",
				blocks: [<NodeAimBotGetYawAngleMini />, <NodeAimBotGetPitchAngleMini />, <NodeAimBotGetMosquitoXPosMini />, <NodeAimBotGetMosquitoYPosMini />, <NodeAimBotGetMosquitoZPosMini />],
			},
			{ name: "Actions", blocks: [<NodeAimBotSetYawSpeedMini />, <NodeAimBotSetPitchSpeedMini />, <NodeAimBotShootMini />] },
			{ name: "Operators", blocks: [<NodeAddMini />, <NodeSubtractMini />, <NodeMultiplyMini />, <NodeDivideMini />, <NodeArcTanMini />, <NodePIMini />, <NodeSqrtMini />, <NodeClampMini />] },
			{ name: "Comparisons", blocks: [<NodeLessThanMini />, <NodeGreaterThanMini />] },
			{ name: "Logicals", blocks: [<NodeAndMini />, <NodeOrMini />] },
			{ name: "Conditionals", blocks: [<NodeIfMini />] },
			{ name: "Utilities", blocks: [<NodePrintMini />] },
		],
	},
};
