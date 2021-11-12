import { NodeGreaterThanMini, NodeLessThanMini } from "../components/ReactFlow/NodeComparisons";
import { NodeIfMini, NodeWhileMini } from "../components/ReactFlow/NodeConditionals";
import {
	NodeHeatSeekerFireSensorMini,
	NodeHeatSeekerLeftSensorMini,
	NodeHeatSeekerLeftWheelMini,
	NodeHeatSeekerMiddleSensorMini,
	NodeHeatSeekerRightSensorMini,
	NodeHeatSeekerRightWheelMini,
	NodeHeatSeekerWaterHoseMini,
} from "../components/ReactFlow/NodeHeatSeeker"; // TODO
import { NodeAndMini, NodeNotMini, NodeOrMini } from "../components/ReactFlow/NodeLogicals";
import { NodeAbsoluteMini, NodeAddMini, NodeDivideMini, NodeMultiplyMini, NodeSubtractMini } from "../components/ReactFlow/NodeOperations";
import { comparisonBoostData, ifBoostData, whileBoostData } from "./explore-data";

export default {
	name: "Hyperloop",
	query: "hyperloop",
	caption:
		"Students will be creating a hyperloop controller where they will control the output track that the starting track is connected to. The people using the hyperloop cars will display which output they want to go in a number system of binary, octal, decimal, or hexadecimal in a text box. This will then need to be converted to another number system which will tell a robot in a booth which buttons to press to turn the connecting track to the correct output. The purpose of this project is to understand how different number base systems work.",
	stacked: true,
	scenePrefix: "Project_Hyperloop",
	runType: "loop",
	durPerLesson: "45 mins",
	numOfLessons: 9,
	difficulty: "Advanced",
	subjects: ["Technology", "Engineering", "Computer Science", "Fire Safety"],
	learningOutcome: "/hyperloop/files/project-overview.pdf",
	curriculumAlignment: "/hyperloop/files/curriculum-alignment.pdf",
	lessonPlan: "/hyperloop/files/lesson-plan-hyperloop.pdf",
	learnings: ["Convert a binary number to a decimal number.",
	"Convert a decimal number to a binary number",
	"Convert any base number system to any other base number system by using base 10 as an intermediary conversion.",],
	define: {
		url: "https://youtu.be/a7ahjbh_lUg",
		src: "/hyperloop/vid/situation.mp4",
		h1: "",
		h2: "",
		title: "Hyperloop",
		docs: "https://docs.google.com/document/d/1N8EoifM1ab4bYGe-sQOeHM4aCjCaAqrb8vyBBag7u4A/edit",
		word: "https://docs.google.com/document/d/1N8EoifM1ab4bYGe-sQOeHM4aCjCaAqrb8vyBBag7u4A/edit",
	},
	imagine: {
		caption: [
			"As a class, dive into group discussions around the Project theme to fully define our problem.",
			"Your educator will let you know if they want you to answer these questions in your learning journal individually, as a group, or as a class discussion.",
		],
		modules: [
			{
				title: "Imagine...",
				img: "/hyperloop/img/define.jpg",
				url: "/hyperloop/files/12050102AB-imagine_page1.pdf",
			},
			{
				title: "Define Our Solution",
				img: "/hyperloop/img/define.jpg",
				url: "/hyperloop/files/12050102AB-imagine_page2.pdf",
			},
			{
				title: "Define Our Solution",
				img: "/hyperloop/img/define.jpg",
				url: "/hyperloop/files/12050102AB-imagine_page3.pdf",
			},
		],
	},
	iterations: [
		{
			research: {
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "task",
						title: "Task: Line following",
						url: "/hyperloop/files/Research-02-hyperloop.pdf",
					},
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
						url: "/hyperloop/pdf/Subproblem1.pdf",
					},
					{
						type: "pdf",
						title: "Action blocks",
						url: "/hyperloop/pdf/Iter_0.pdf",
					},
					{
						type: "task",
						title: "Task: Actions",
						url: "/hyperloop/files/Research-hyperloop-1.pdf",
					},
				],
			},
			plan: [
				"",
			],
			create: {
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["Write some code so that your robot can..."],
				hints: [
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it for future steps.",
				],
			},
			blockList: [{ name: "Actions", blocks: [<NodeHeatSeekerLeftWheelMini />, <NodeHeatSeekerRightWheelMini />] }],
			research: {
				caption: ["Work through the four modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Introduction to Flow blocks",
						url: "/hyperloop/pdf/Subproblem2.pdf",
					},
					{
						type: "pdf",
						title: "Sensing blocks",
						url: "/hyperloop/pdf/Iter_1.pdf",
					},
					{
						type: "task",
						title: "Task: Sensing",
						url: "/hyperloop/files/Research-hyperloop-2.pdf",
					},
					{
						type: "explore",
						title: "Explore more",
						items: [comparisonBoostData, ifBoostData],
					},
				],
			},
			plan: [
				"",
			],
			create: {
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["Upgrade your code so that your robot can..."],
				hints: [
					"",
				],
			},
			blockList: [
				{ name: "Sensing", blocks: [<NodeHeatSeekerLeftSensorMini />, <NodeHeatSeekerRightSensorMini />] },
				{ name: "Actions", blocks: [<NodeHeatSeekerLeftWheelMini />, <NodeHeatSeekerRightWheelMini />] },
				{ name: "Operators", blocks: [<NodeAbsoluteMini />, <NodeAddMini />, <NodeSubtractMini />, <NodeMultiplyMini />, <NodeDivideMini />] },
				{ name: "Comparisons", blocks: [<NodeLessThanMini />, <NodeGreaterThanMini />] },
				{ name: "Logicals", blocks: [<NodeNotMini />, <NodeAndMini />, <NodeOrMini />] },
				{ name: "Conditionals", blocks: [<NodeIfMini />] },
			],
		},
		{
			research: {
				caption: ["There is no research step. Move onto Plan."],
				modules: [],
			},
			plan: [
				"",
			],
			create: {
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["Upgrade your code so that your robot can..."],
				hints: [
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it for future steps.",
				],
			},
			blockList: [
				{ name: "Sensing", blocks: [<NodeHeatSeekerLeftSensorMini />, <NodeHeatSeekerMiddleSensorMini />, <NodeHeatSeekerRightSensorMini />] },
				{ name: "Actions", blocks: [<NodeHeatSeekerLeftWheelMini />, <NodeHeatSeekerRightWheelMini />] },
				{ name: "Operators", blocks: [<NodeAbsoluteMini />, <NodeAddMini />, <NodeSubtractMini />, <NodeMultiplyMini />, <NodeDivideMini />] },
				{ name: "Comparisons", blocks: [<NodeLessThanMini />, <NodeGreaterThanMini />] },
				{ name: "Logicals", blocks: [<NodeNotMini />, <NodeAndMini />, <NodeOrMini />] },
				{ name: "Conditionals", blocks: [<NodeIfMini />] },
			],
		},
		{
			research: {
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "task",
						title: "Task: Fire fighting",
						url: "/hyperloop/files/Research-01-hyperloop.pdf",
					},
					{
						type: "pdf",
						title: "Introduction to Flow blocks",
						url: "/hyperloop/pdf/Subproblem3.pdf",
					},
					{
						type: "pdf",
						title: "Fire blocks",
						url: "/hyperloop/pdf/Iter_3.pdf",
					},
					{
						type: "task",
						title: "Task: Fire",
						url: "/hyperloop/files/Research-hyperloop-4.pdf",
					},
					{
						type: "explore",
						title: "Explore more",
						items: [whileBoostData],
					},
				],
			},
			plan: [
				"Think back to when you were manually controlling the robot... What actions were you performing? What information were you using to decide which action to perform?",
			],
			create: {
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["Write some code so that your robot can..."],
				hints: [
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it for future steps.",
				],
			},
			blockList: [
				{ name: "Sensing", blocks: [<NodeHeatSeekerFireSensorMini />] },
				{ name: "Actions", blocks: [<NodeHeatSeekerLeftWheelMini />, <NodeHeatSeekerRightWheelMini />, <NodeHeatSeekerWaterHoseMini />] },
				{ name: "Comparisons", blocks: [<NodeLessThanMini />, <NodeGreaterThanMini />] },
				{ name: "Logicals", blocks: [<NodeNotMini />, <NodeAndMini />, <NodeOrMini />] },
				{ name: "Conditionals", blocks: [<NodeIfMini />, <NodeWhileMini />] },
			],
		},
		{
			research: {
				caption: ["There is no research step. Move onto Plan."],
				modules: [],
			},
			plan: [
				"Think back to when you were manually controlling the robot... What actions were you performing? What information were you using to decide which action to perform?",
				"In this step, we will combine all of the logic and solutions that we have built so far to solve the full problem: ...",
				"But first, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
			],
			create: {
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["Write some code so that your robot can ..."],
				hints: [
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it for future steps.",
				],
			},
			blockList: [
				{
					name: "Sensing",
					blocks: [<NodeHeatSeekerLeftSensorMini />, <NodeHeatSeekerMiddleSensorMini />, <NodeHeatSeekerRightSensorMini />, <NodeHeatSeekerFireSensorMini />],
				},
				{
					name: "Actions",
					blocks: [<NodeHeatSeekerLeftWheelMini />, <NodeHeatSeekerRightWheelMini />, <NodeHeatSeekerWaterHoseMini />],
				},
				{
					name: "Operators",
					blocks: [<NodeAbsoluteMini />, <NodeAddMini />, <NodeSubtractMini />, <NodeMultiplyMini />, <NodeDivideMini />],
				},
				{
					name: "Comparisons",
					blocks: [<NodeLessThanMini />, <NodeGreaterThanMini />],
				},
				{
					name: "Logicals",
					blocks: [<NodeNotMini />, <NodeAndMini />, <NodeOrMini />],
				},
				{
					name: "Conditionals",
					blocks: [<NodeIfMini />, <NodeWhileMini />],
				},
			],
		},
	],
	improve: {
		caption: "Test what you’ve learnt by taking on more challenges. There are always ways to make your solution smarter, faster, stronger!",
		alert:
			"Congratulations! If you managed to put out all of the fires with your robot, then you have successfully completed the Project! You now know how to write a line following algorithm that a robot, like our firefighting bot, can use to automatically navigate through an environment.",
			tasks: ["In the Improve step, you will optimise your solution to try and put out all the fires in the shortest possible time.",
					"If you want an additional challenge, try and solve the problem using as few blocks as possible."
					],
			hints: [
					"Your robot's straight-line speed is maximised when the amount of time it spends turning is minimised. You want to be turning as fast as possible but not too fast, or else you may over-shoot the line and have to do another turn.",
					"You could try sending a variable speed to each motor: if you are far away from the line, then turn quickly. If you are only slightly off the line, then turn slower so that your robot doesn't end up oscillating."
					],
		blockList: [
			{
				name: "Sensing",
				blocks: [<NodeHeatSeekerLeftSensorMini />, <NodeHeatSeekerMiddleSensorMini />, <NodeHeatSeekerRightSensorMini />, <NodeHeatSeekerFireSensorMini />],
			},
			{
				name: "Actions",
				blocks: [<NodeHeatSeekerLeftWheelMini />, <NodeHeatSeekerRightWheelMini />, <NodeHeatSeekerWaterHoseMini />],
			},
			{
				name: "Operators",
				blocks: [<NodeAbsoluteMini />, <NodeAddMini />, <NodeSubtractMini />, <NodeMultiplyMini />, <NodeDivideMini />],
			},
			{
				name: "Comparisons",
				blocks: [<NodeLessThanMini />, <NodeGreaterThanMini />],
			},
			{
				name: "Logicals",
				blocks: [<NodeNotMini />, <NodeAndMini />, <NodeOrMini />],
			},
			{
				name: "Conditionals",
				blocks: [<NodeIfMini />, <NodeWhileMini />],
			},
		],
	},
};
