import { NodeEqualsMini, NodeGreaterThanMini, NodeLessThanMini, NodeNotEqualsMini, NodeTrueMini, NodeFalseMini} from "../components/Nodes/NodeComparisons";
import { NodeIfMini, NodeRepeatMini, NodeWhileMini } from "../components/Nodes/NodeConditionals";
import {
	NodeTrainingBotGetBananaGreenMini,
	NodeTrainingBotGetBananaYellowMini,
	NodeTrainingBotGetBananaBrownMini,
	NodeTrainingBotGetTrafficLightMini,
	NodeTrainingBotPullLeverMini,
	NodeTrainingBotPunchMini,
	NodeTrainingBotTurnLeftMini,
	NodeTrainingBotTurnRightMini,
	NodeTrainingBotMoveForwardMini,
	NodeTrainingBotPumpTyreMini,
	NodeTrainingBotWalkMini,
	NodeTrainingBotStopMini,
	NodeTrainingBotAddMini,
	NodeTrainingBotSubMini,
	NodeTrainingBotMulMini,
	NodeTrainingBotDivMini,
	NodeTrainingBotThrowBalloonMini,
	NodeRestartInitializeMini,
	NodeDelayedRestartInitializeMini,
} from "../components/Nodes/NodeTrainingCamp";
import { NodePrintMini } from "../components/Nodes/NodeUtils";
import { NodeAndMini, NodeNotMini, NodeOrMini} from "../components/Nodes/NodeLogicals";
import { NodeAbsoluteMini, NodeAddMini, NodeDivideMini, NodeMultiplyMini, NodeSubtractMini } from "../components/Nodes/NodeOperations";
import { COMPUTER_SCIENCE, ENGINEERING, FIRE_SAFETY, TECHNOLOGY } from "../constants/projectSubjects";
import { IProjectReadOnly } from "../types/projects";
import { comparisonBoostData, ifBoostData, whileBoostData } from "./explore-data";

const FLOW_TRAINING_CAMP_DATA: IProjectReadOnly = {
	name: "Flow Training Camp",
	wip: true,
	query: "flow-training-camp",
	caption:
		"Learn the fundamentals of programming using the Flow visual language. Flow is synonymous with creating flow charts, so you can focus on learning programming logic without having to memorize arbitrary syntax! In this Project, you will be programming an assistant robot in a testing facility to complete a variety of unusual tasks.",
	stacked: true,
	scenePrefix: "Project_TrainingCamp",
	runType: "loop",
	durPerLesson: "45 mins",
	numOfLessons: 9,
	difficulty: "advanced",
	subjects: [TECHNOLOGY, ENGINEERING, COMPUTER_SCIENCE, FIRE_SAFETY],
	learningOutcome: "/heat-seeker/files/project-overview.pdf",
	cads: {
		nz: "/heat-seeker/cads/020802AD Curriculum Alignment - Heat Seeker - NZ.pdf",
		aus: "/heat-seeker/cads/020802AD Curriculum Alignment - Heat Seeker - ACARA.pdf",
		cali: "/heat-seeker/cads/020802AD Curriculum Alignment - Heat Seeker - California.pdf",
		uk: "/heat-seeker/cads/020802AD Curriculum Alignment - Heat Seeker - England.pdf",
	},
	lessonPlan: "/heat-seeker/files/lesson-plan-heat-seeker.pdf",
	learnings: [
		"TBD",
	],
	define: {
		threshold: 60,
		url: "https://www.youtube.com/watch?v=qsRFNAa3iaY",
		src: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/flow-training-camp/vid/training-camp-situation.m4v",
		h1: "Welcome to CreateBase headquarters! In this testing facility, humanoid robots are built and programmed for the purpose of assisting humans to perform everyday tasks.",
		h2: "As a testing officer, your job is assess the capabilities of the latest robot design. You will do this by creating programs that will enable the robot to progress through a series of increasingly difficult tests. If successful, your robot will be approved for release into the world!",
		docs: "",
		word: "/flow-training-camp/files/learning-journal-flow-training-camp.docx",
	},
	imagine: {
		threshold: 120,
		modules: [
			{
				type: "pdf",
				title: "Routines and automation",
				img: "",
				url: "",
			},
			{
				type: "pdf",
				title: "Our problem",
				img: "",
				url: "",
			},
			{
				type: "pdf",
				title: "Your solution",
				img: "",
				url: "",
			},
		],
	},
	subsystems: [
		{
			title: "The Maze",
			requirements: [],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/heat-seeker/img/1.png",
			description: "In this first subsystem, we will learn how to sequence code to enable our robot to navigate through a fixed maze.",
			research: {
				threshold: 60,
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "video",
						title: "Flow tutorial",
						data: {
							url: "https://youtu.be/2Ndwtpk7iN8",
							src: "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/flow-tut.mp4",
							h1: "Flow Tutorial",
							h2: "Get to know your way around Flow",
						},
					},
					{
						type: "pdf",
						title: "Action blocks",
						url: "/flow-training-camp/pdf/action-blocks.pdf",
					},
				],
			},
			plan: {
				threshold: 30,
				list: [
					"Open up your learning journal and answer all of the questions in the Plan section for subsystem 1. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 120,
				tasks: ["Test the robot's ability to perform actions by writing some code to navigate through a maze."],
				hints: [
					"You need to use a sequence of action blocks.",
					"Rather than trying to complete the entire task in one go, slowly build up your answer step by step.",
					"Before you leave the simulation, click the save button in the bottom left menu so that you can continue writing your code where you left off when you return!",
				],
			},
			blockList: [
				{ name: "Actions", blocks: [<NodeTrainingBotMoveForwardMini />, <NodeTrainingBotTurnLeftMini />, <NodeTrainingBotTurnRightMini />, <NodeTrainingBotPunchMini />] },
				{ name: "Utilities", blocks: [<NodePrintMini />] }
			],
		},
		{
			title: "Banana Sorting",
			requirements: ["Speed control"],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/heat-seeker/img/3.png",
			description: "Let's take things further by programming our robot to detect significant turns in the line and adjust its movement accordingly.",
			research: {
				threshold: 1,
				caption: ["There is nothing new to research for this subsystem. You can continue to Plan."],
				modules: [
					{
						type: "pdf",
						title: "Proceed to Plan",
						url: "/2105AD-No-Research.pdf",
					},
				],
			},
			plan: {
				threshold: 300,
				list: [
					"Think back to when you were manually controlling the robot... What actions were you performing? What information were you using to decide which action to perform?",
					"In this step, our aim is to create a plan for how our robot could navigate around multiple turns.",
					"But first, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 300,
				tasks: ["Upgrade your code so that your robot can follow the line achieve turns properly."],
				hints: [
					"You will need to use a sensor to detect the line and differentiate between curves and turns.",
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it for future steps.",
				],
			},
			blockList: [
				{ name: "Sensing", blocks: [<NodeTrainingBotGetBananaGreenMini />, <NodeTrainingBotGetBananaYellowMini />, <NodeTrainingBotGetBananaBrownMini />] },
				{ name: "Actions", blocks: [<NodeTrainingBotPullLeverMini />] },
				{ name: "Conditionals", blocks: [<NodeWhileMini />, <NodeEqualsMini />, <NodeTrueMini />] },
				{ name: "Logicals", blocks: [<NodeNotMini />, <NodeAndMini />, <NodeOrMini />, ] },
				{ name: "Utilities", blocks: [<NodePrintMini />] }
			],
		},
		{
			title: "Tyre Pumping",
			requirements: [],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/heat-seeker/img/4.PNG",
			description: "In this fourth subsystem, we will learn how to use a sensor to detect the presence of a fire and then perform the correct sequence of actions to automatically put it out.",
			research: {
				threshold: 300,
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Introduction to Flow blocks",
						url: "/heat-seeker/pdf/Subproblem3.pdf",
					},
					{
						type: "pdf",
						title: "Fire blocks",
						url: "/heat-seeker/pdf/Iter_3.pdf",
					},
					{
						type: "explore",
						title: "Explore more",
						items: [whileBoostData],
					},
				],
			},
			plan: {
				threshold: 120,
				list: [
					"Think back to when you were manually controlling the robot... What actions were you performing? What information were you using to decide which action to perform?",
					"In this step, our aim is to create a plan for how our robot could put out fires using the water hose",
					"But first, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 120,
				tasks: ["Write some code so that your robot can drive forward, putting out fires along the way."],
				hints: [
					"You need to use the fire sensor to detect the fire.",
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it for future steps.",
				],
			},
			blockList: [
				{ name: "Actions", blocks: [<NodeTrainingBotPumpTyreMini />] },
				{ name: "Conditionals", blocks: [<NodeRepeatMini />] },
				{ name: "Utilities", blocks: [<NodePrintMini />] }
			],
		},
		{
			title: "Red Light Green Light",
			requirements: ["Navigating curves", "Navigating turns", "Extinguishing fires"],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/heat-seeker/img/thumbnail.png",
			description:
				"We will now combine everything that we have learnt to create a control program for our line following robot to allow it to complete the full course, automatically putting out any fires in its way.",
			research: {
				threshold: 1,
				caption: ["There is nothing new to research for this subsystem. You can continue to Plan."],
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
					"Think back to when you were manually controlling the robot... What actions were you performing? What information were you using to decide which action to perform?",
					"In this step, we will combine all of the logic and solutions that we have built so far to solve the full problem: navigating around the entire warehouse and putting out any fires in our way.",
					"But first, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 120,
				tasks: ["Write some code so that your robot can follow the line, putting out fires along the way."],
				hints: [
					"You will need to use the fire sensor to detect the fire. Move through the map to find all the fires",
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it in the Improve step.",
				],
			},
			blockList: [
				{ name: "Sensing", blocks: [<NodeTrainingBotGetTrafficLightMini />], },
				{ name: "Actions", blocks: [<NodeTrainingBotWalkMini />, <NodeTrainingBotStopMini />], },
				{ name: "Comparisons", blocks: [<NodeNotEqualsMini />, <NodeEqualsMini />], },
				{ name: "Conditionals", blocks: [<NodeIfMini />, <NodeWhileMini />, <NodeTrueMini />], },
				{ name: "Utilities", blocks: [<NodePrintMini />] }
			],
		},
	],
	improve: {
		threshold: 600,
		alert:
			"Congratulations! If you managed to put out all of the fires with your robot, then you have successfully completed the Project! You now know how to write a line following algorithm that a robot, like our firefighting bot, can use to automatically navigate through an environment.",
		tasks: [
			"In the Improve step, you will optimise your solution to try and put out all the fires in the shortest possible time.",
			"If you want an additional challenge, try and solve the problem using as few blocks as possible.",
		],
		hints: [
			"Your robot's straight-line speed is maximised when the amount of time it spends turning is minimised. You want to be turning as fast as possible but not too fast, or else you may over-shoot the line and have to do another turn.",
			"You could try sending a variable speed to each motor: if you are far away from the line, then turn quickly. If you are only slightly off the line, then turn slower so that your robot doesn't end up oscillating.",
		],
		blockList: [
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
			{ name: "Utilities", blocks: [<NodePrintMini />] },
		],
	},
};

export default FLOW_TRAINING_CAMP_DATA;
