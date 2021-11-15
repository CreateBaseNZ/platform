import {
	NodeAimBotGetYawAngleMini,
	NodeAimBotGetPitchAngleMini,
	NodeAimBotGetMosquitoXPosMini,
	NodeAimBotGetMosquitoYPosMini,
	NodeAimBotGetMosquitoZPosMini,
	NodeAimBotSetYawSpeedMini,
	NodeAimBotSetPitchSpeedMini,
	NodeAimBotShootMini,
} from "../components/ReactFlow/NodeAimbot";
import { NodeGreaterThanMini, NodeLessThanMini } from "../components/ReactFlow/NodeComparisons";
import { NodeIfMini } from "../components/ReactFlow/NodeConditionals";
import { NodeAndMini, NodeOrMini } from "../components/ReactFlow/NodeLogicals";
import { NodeAddMini, NodeDivideMini, NodeMultiplyMini, NodeSubtractMini, NodeArcTanMini, NodePIMini, NodeSqrtMini, NodeClampMini } from "../components/ReactFlow/NodeOperations";
import { comparisonBoostData, ifBoostData } from "./explore-data";
import { NodePrintMini } from "../components/ReactFlow/NodeUtils";

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
	subjects: ["Computer Science", "Scripting", "Maths", "Engineering"],
	learningOutcome: "TBD",
	curriculumAlignment: "TBD",
	lessonPlan: "TBD",
	learnings: [
		"Use and track multiple variables throughout a program.",
		"Use while loops to continually perform micro-actions.",
		"Apply trigonometry to calculate angles in a 2-dimensional plane.",
		"Apply trigonometry to 3-dimensional space.",
		"Apply control systems theory a control plant.",
	],
	define: {
		url: "https://youtu.be/wB53GoLXzME",
		src: "/aimbot/vid/situation.mp4",
		h1: "Dive into the situation by watching this short video.",
		h2: "What do you think is happening here? Discuss with your peers!",
		title: "TBD",
		docs: "TBD",
		word: "TBD",
	},
	imagine: {
		caption: [
			"As a class, dive into group discussions around the Project theme to fully define our problem.",
			"Your educator will let you know if they want you to answer these questions in your learning journal individually, as a group, or as a class discussion.",
		],
		modules: [
			{
				title: "TBD",
				img: "/aimbot/img/thumbnail.png",
				url: "/aimbot/files/imagine.pdf",
			},
		],
	},
	subsystems: [
		{
			title: "Subsystem 1",
			requirements: [],
			imgSrc: "/aimbot/img/thumbnail.png", // TODO
			description: "Lorem ipsum dolor sit amet. Et sint illo vel nulla eligendi et repudiandae quia est architecto error et quia asperiores sed natus molestiae est enim rerum", // TODO
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
				{ name: "Sensing", blocks: [<NodeAimBotGetYawAngleMini />, <NodeAimBotGetMosquitoXPosMini />, <NodeAimBotGetMosquitoZPosMini />] },
				{ name: "Actions", blocks: [<NodeAimBotSetYawSpeedMini />, <NodeAimBotShootMini />] },
				{ name: "Operators", blocks: [<NodeAddMini />, <NodeSubtractMini />, <NodeMultiplyMini />, <NodeDivideMini />, <NodeArcTanMini />, <NodePIMini />] },
				{ name: "Comparisons", blocks: [<NodeLessThanMini />, <NodeGreaterThanMini />] },
				{ name: "Logicals", blocks: [<NodeAndMini />, <NodeOrMini />] },
				{ name: "Conditionals", blocks: [<NodeIfMini />] },
				{ name: "Utilities", blocks: [<NodePrintMini />] },
			],
		},
		{
			title: "Subsystem 2",
			requirements: ["Subsystem 1"],
			imgSrc: "/aimbot/img/thumbnail.png", // TODO
			description: "Lorem ipsum dolor sit amet. Et sint illo vel nulla eligendi et repudiandae quia est architecto error et quia asperiores sed natus molestiae est enim rerum", // TODO
			research: {
				caption: ["There is no new research for this sub-problem. Move onto Plan."],
				modules: [],
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
			imgSrc: "/aimbot/img/thumbnail.png", // TODO
			description: "Lorem ipsum dolor sit amet. Et sint illo vel nulla eligendi et repudiandae quia est architecto error et quia asperiores sed natus molestiae est enim rerum", // TODO
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
			imgSrc: "/aimbot/img/thumbnail.png", // TODO
			description: "Lorem ipsum dolor sit amet. Et sint illo vel nulla eligendi et repudiandae quia est architecto error et quia asperiores sed natus molestiae est enim rerum", // TODO
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
		alert: "TBD",
		tasks: ["TBD"],
		hints: ["TBD"],
		code: true,
		blockList: [
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
