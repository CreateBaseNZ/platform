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
	name: "AimBot",
	query: "aimbot",
	caption:
		"Mosquitos are spreading disease amongst the human population! In this Project, students will reprogram a series of robots to detect, track and destroy any mosquitos that they encounter. Students will use basic trigonometry principles to convert raw sensor data into movements for the robot which will require the use of variables and mathematical operations. Other topics covered include the effect that internal forces can have on a robot's design/operation and an introduction to proportional controllers.",
	stacked: true,
	scenePrefix: "Project_Aimbot",
	runType: "loop",
	durPerLesson: "45 mins",
	numOfLessons: 9,
	difficulty: "advanced",
	subjects: [COMPUTER_SCIENCE, SCRIPTING, TRIGONOMETRY, ENGINEERING],
	learningOutcome: "/aimbot/files/210505AD_EarlyAccess.pdf",
	cads: {
		nz: "/aimbot/cads/020802AE Curriculum Alignment - AimBot - NZ.pdf",
		aus: "/aimbot/cads/020802AE Curriculum Alignment - AimBot - ACARA.pdf",
		cali: "/aimbot/cads/020802AE Curriculum Alignment - AimBot - California.pdf",
		uk: "/aimbot/cads/020802AE Curriculum Alignment - AimBot - England.pdf",
	},
	lessonPlan: "/aimbot/files/210505AD_EarlyAccess.pdf",
	learnings: [
		"Use and track multiple variables throughout a program.",
		"Use while loops to continually perform micro-actions.",
		"Apply trigonometry to calculate angles in a 2-dimensional plane.",
		"Apply trigonometry to 3-dimensional space.",
		"Apply control systems theory to a control plant.",
	],
	define: {
		threshold: 30,
		url: "https://www.youtube.com/watch?v=znMZhBSDW_I",
		src: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/aimbot/vid/situation.mp4",
		h1: "Dive into the situation by watching this short video.",
		h2: "Your first step to begin solving this problem is to download either of the learning journals below, saving a copy for yourself. Your learning journal will guide you through the Project and serves as a place to document your progress.",
		title: "AimBot",
		docs: "https://docs.google.com/document/d/1UTyQpsp9bAAdAiJFq9vbNVb7Cy1PoW2x57Sv5YgTYnM/edit#",
		word: "/aimbot/files/210505AC AimBot Learning Journal.docx",
	},
	imagine: {
		threshold: 60,
		caption: [
			"As a class, dive into group discussions around the Project theme to fully define our problem.",
			"Your educator will let you know if they want you to answer these questions in your learning journal individually, as a group, or as a class discussion.",
		],
		modules: [
			{
				type: "pdf",
				title: "In this Project...",
				img: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/aimbot/img/thumbnail.jpg",
				url: "/aimbot/files/21050502AA_imagine.pdf",
			},
		],
	},
	subsystems: [
		{
			title: "Yaw control",
			requirements: [],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/aimbot/img/subsystem/subsystem_1.jpg",
			description:
				"In this subsystem, we will restrict the movement of the mosquito and our arm to a single dimension. We will need to use sensor data to calculate where we should aim, move our arm to that position, and then activate the laser!",
			research: {
				threshold: 600,
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to code your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Axis, Pitch and Yaw",
						url: "/aimbot/pdf/2105050301AA_research_PitchYawAxis.pdf",
					},
					{
						type: "pdf",
						title: "Trigonometry",
						url: "/aimbot/pdf/2105050301AB_research_Trigonometry.pdf",
					},
					{
						type: "pdf",
						title: "Introduction to Flow Part I",
						url: "/aimbot/pdf/2105050301AC_research_1_blocks.pdf",
					},
				],
			},
			plan: {
				threshold: 600,
				list: [
					"In this first subsystem, our aim is to understand how to calculate how far we need to move our arm to aim at the next mosquito. We will then perform a movement before firing the laser at the mosquito.",
					"To do this, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section for subsystem 1. If you get stuck, your educator may let you ask your classmates for help, but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 600,
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: [
					"Mosquitos will be appearing across your screen in a horizontal line.",
					"You need to find the position of each mosquito, aim your robot by controlling its yaw angle, and then fire to destroy all of the mosquitos.",
					"If you aim too slowly, the mosquitos will disappear! Make sure that you turn your robot quickly.",
				],
				hints: [
					"You will need to use the x coordinate of the mosquitos to calculate the angle that you need to aim at using trigonometry.",
					"You can aim by controlling the velocity of the motors in the robot's arm.",
					"To avoid overshooting your target, you may want to have a dynamic velocity where you slow down your speed as you get close to your target.",
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it in future steps.",
				],
			},
			blockList: [
				{ name: "Sensing", blocks: [<NodeAimBotGetYawAngleMini />, <NodeAimBotGetMosquitoXPosMini />, <NodeAimBotGetMosquitoZPosMini />] },
				{ name: "Actions", blocks: [<NodeAimBotSetYawSpeedMini />, <NodeAimBotShootMini />] },
				{ name: "Operators", blocks: [<NodeAddMini />, <NodeSubtractMini />, <NodeMultiplyMini />, <NodeDivideMini />, <NodeArcTanMini />, <NodePIMini />, <NodeClampMini />] },
				{ name: "Comparisons", blocks: [<NodeLessThanMini />, <NodeGreaterThanMini />] },
				{ name: "Conditionals", blocks: [<NodeIfMini />] },
				{ name: "Utilities", blocks: [<NodePrintMini />] },
			],
		},
		{
			title: "Pitch control",
			requirements: ["Yaw control"],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/aimbot/img/subsystem/subsystem_2.jpg",
			description: "Let's expand our problem from subsystem 1 to include a second dimension! We will be copying our answer from the previous code but adding pitch motor controls.",
			research: {
				threshold: 30,
				caption: ["There is no new research for this sub-problem. Move onto Plan."],
				modules: [
					{
						type: "pdf",
						title: "Introduction to Flow blocks 2",
						url: "/aimbot/pdf/2105050301AD_research_2_blocks.pdf",
					},
				],
			},
			plan: {
				threshold: 30,
				list: [
					"In this second subsystem, our aim is to expand our code from subsystem 1 to also aim in the vertical direction by controlling the pitch rotation of the robot's arm.",
					"We will start by making a plan. Open up your learning journal and answer all of the questions in the Plan section for subsystem 2. If you get stuck, your educator may let you ask your classmates for help, but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 300,
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: [
					"Mosquitos will now start appearing to the left, to the right, up and down.",
					"You need to find the x position of each mosquito, aim your robot by controlling its yaw angle then ALSO find the y position of each mosquito and aim your robot by controlling its pitch angle.",
				],
				hints: [
					"You will need to use the x and y coordinates of the mosquitos to calculate the yaw and pitch angles that you need to aim at separately.",
					"You can also break the movement of the arm into two separate movements: first yaw and then pitch (or the other way around).",
				],
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
			title: "Velocity controller",
			requirements: ["Yaw control"],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/aimbot/img/subsystem/subsystem_3.jpg",
			description: "In this subsystem, we will try and make our solution to the first subsystem more realistic by incorporating forces and a breakable arm.",
			research: {
				threshold: 600,
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to code your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Intro to Forces",
						url: "/aimbot/pdf/2105050301AE_research_IntroToForces.pdf",
					},
					{
						type: "pdf",
						title: "Intro to Controllers",
						url: "/aimbot/pdf/2105050301AF_research_IntroToControllers.pdf",
					},
					{
						type: "pdf",
						title: "Finer Velocity Control",
						url: "/aimbot/pdf/2105050301AG_research_FinerVelocityControl.pdf",
					},
				],
			},
			plan: {
				threshold: 600,
				list: [
					"In the third subsystem, we are trying to implement a controller for our motors to avoid changing our velocity too quickly and breaking the arm.",
					"To keep things simple, we will start by just considering mosquitos appearing along one direction (the x-axis).",
					"We will start by making a plan. Open up your learning journal and answer all of the questions in the Plan section for subsystem 3. If you get stuck, your educator may let you ask your classmates for help, but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 600,
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["Mosquitos will be appearing across your screen in a horizontal line.", "Just like in subsystem 1, your task is to destroy all of the mosquitos quickly before they disappear."],
				hints: [
					"If you try and change the speed of your robot's arm by more than 180 degrees per second, then your arm will break.",
					"If you saved your solution to subsystem 1, you can use it as a starting point for this subsystem by pressing the restore button in the dropzone.",
					"You need to upgrade your solution to subsystem 1 by changing the way that you calculate the velocity to assign to each motor.",
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it in future steps.",
				],
			},
			blockList: [
				{ name: "Variables", blocks: [<NodeAimBotGetCurrentYawSpeedMini />, <NodeAimBotSetCurrentYawSpeedMini />] },
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
			title: "Putting it all together",
			requirements: ["Pitch control", "Velocity controller"],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/aimbot/img/subsystem/subsystem_4.jpg",
			description: "Lets put together everything that we have learnt to program a solution to the full problem!",
			research: {
				threshold: 1,
				caption: ["There is no new research for this subsystem. Move directly to Plan. Do not pass Go. Do not collect $100."],
				modules: [
					{
						type: "pdf",
						title: "Proceed to Plan",
						url: "/2105AD-No-Research.pdf",
					},
				],
			},
			plan: {
				threshold: 30,
				list: [
					"We will now plan how we will put everything that we have learnt so far together to solve the full problem. Open up your learning journal and answer all of the questions in the Plan section for subsystem 4. If you get stuck, your educator may let you ask your classmates for help, but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 600,
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: [
					"Just like in subsystem 2, mosquitos will appear to the left, to the right, up and down.",
					"Your task is to destroy all of the mosquitos quickly before they disappear but without breaking the robot's arm by applying too much force.",
				],
				hints: [
					"If you try and change the speed of your robot's arm by more than 180 degrees per second, then your arm will break.",
					"If you saved your solution to subsystem 2 or 3, you can use either as a starting point for this subsystem by pressing the restore button in the dropzone.",
					"You need to upgrade your solution to subsystem 2 by using a simple proportional controller to calculate the velocity to assign to the pitch and yaw motors.",
				],
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
		threshold: 600,
		caption: "Test what you’ve learnt by taking on more challenges. There are always ways to make your solution smarter, faster, stronger!",
		alert:
			"Congratulations! You now have a solution that will destroy any mosquitos that cross the path of your robot! Mosquitos everywhere will be trembling in fear! We have now added a timer to the simulation that will measure how long it takes your robot to find and destroy all of the mosquitos.",
		tasks: [
			"Mosquitos will be appearing across your screen in both the x and y directions.",
			"You will need to find the position of each mosquito, aim your robot, and then fire to destroy all of the mosquitos, just like in the Create step.",
			"You will need to move your arm as fast as possible to get the fastest possible time.",
			"Compete with your peers to get the fastest time.",
		],
		hints: [
			"If you set the speed of your arm too high, you may overshoot your targets.",
			"The best way to decrease your time will be to optimise your controller.",
			"Don't forget to take a screenshot of your best time and paste it into your learning journal for proof!",
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
