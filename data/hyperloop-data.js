import { NodeGreaterThanMini, NodeLessThanMini } from "../components/ReactFlow/NodeComparisons";
import { NodeIfMini } from "../components/ReactFlow/NodeConditionals";
import { NodeAndMini, NodeOrMini } from "../components/ReactFlow/NodeLogicals";
import { NodeAddMini, NodeDivideMini, NodeMultiplyMini, NodeSubtractMini, NodeArcTanMini, NodePIMini, NodeSqrtMini, NodeClampMini } from "../components/ReactFlow/NodeOperations";
import { comparisonBoostData, ifBoostData } from "./explore-data";
import { NodePrintMini } from "../components/ReactFlow/NodeUtils";
import { COMPUTER_SCIENCE, ENGINEERING, TECHNOLOGY } from "../constants/projectSubjects";

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
	subjects: [TECHNOLOGY, ENGINEERING, COMPUTER_SCIENCE],
	learningOutcome: "/hyperloop/files/project-overview.pdf",
	curriculumAlignment: "/hyperloop/files/curriculum-alignment.pdf",
	lessonPlan: "/hyperloop/files/lesson-plan-hyperloop.pdf",
	learnings: ["Convert a binary number to a decimal number.",
		"Convert a decimal number to a binary number",
		"Convert any base number system to any other base number system by using base 10 as an intermediary conversion.",],
	define: {
		url: "https://youtu.be/UvZtYfMDLDI",
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
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it in future steps."
				],
			},
			blockList: [
				{ name: "Variables", blocks: [] },
				{ name: "Sensing", blocks: [] },
				{ name: "Actions", blocks: [] },
				{ name: "Operators", blocks: [] },
				{ name: "Comparisons", blocks: [] },
				{ name: "Logicals", blocks: [] },
				{ name: "Conditionals", blocks: [] },
				{ name: "Utilities", blocks: [<NodePrintMini />] },
			],
		},
		{
			title: "Subsystem 2",
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
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it in future steps."
				],
			},
			blockList: [
				{ name: "Variables", blocks: [] },
				{ name: "Sensing", blocks: [] },
				{ name: "Actions", blocks: [] },
				{ name: "Operators", blocks: [] },
				{ name: "Comparisons", blocks: [] },
				{ name: "Logicals", blocks: [] },
				{ name: "Conditionals", blocks: [] },
				{ name: "Utilities", blocks: [<NodePrintMini />] },
			],
		},
		{
			title: "Subsystem 3",
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
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it in future steps."
				],
			},
			blockList: [
				{ name: "Variables", blocks: [] },
				{ name: "Sensing", blocks: [] },
				{ name: "Actions", blocks: [] },
				{ name: "Operators", blocks: [] },
				{ name: "Comparisons", blocks: [] },
				{ name: "Logicals", blocks: [] },
				{ name: "Conditionals", blocks: [] },
				{ name: "Utilities", blocks: [<NodePrintMini />] },
			],
		},
		{
			title: "Subsystem 4",
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
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it in future steps."
				],
			},
			blockList: [
				{ name: "Variables", blocks: [] },
				{ name: "Sensing", blocks: [] },
				{ name: "Actions", blocks: [] },
				{ name: "Operators", blocks: [] },
				{ name: "Comparisons", blocks: [] },
				{ name: "Logicals", blocks: [] },
				{ name: "Conditionals", blocks: [] },
				{ name: "Utilities", blocks: [<NodePrintMini />] },
			],
		}
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
			{ name: "Variables", blocks: [] },
			{ name: "Sensing", blocks: [] },
			{ name: "Actions", blocks: [] },
			{ name: "Operators", blocks: [] },
			{ name: "Comparisons", blocks: [] },
			{ name: "Logicals", blocks: [] },
			{ name: "Conditionals", blocks: [] },
			{ name: "Utilities", blocks: [<NodePrintMini />] },
		],
	},
};
