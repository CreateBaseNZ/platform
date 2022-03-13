import { NodeEqualsMini, NodeGreaterThanMini, NodeLessThanMini, NodeNotEqualsMini, NodeTrueMini, NodeFalseMini} from "../components/Nodes/NodeComparisons";
import { NodeIfMini, NodeRepeatMini, NodeWhileMini } from "../components/Nodes/NodeConditionals";
import {
	NodeTrainingBotGetBananaGreenMini,
	NodeTrainingBotGetBananaYellowMini,
	NodeTrainingBotGetBananaBrownMini,
	NodeTrainingBotGetTrafficLightMini,
	NodeTrainingBotGetTyrePressureMini,
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
	name: "Fundamentals of Code",
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
				title: "Demystifying programming",
				img: "/flow-training-camp/img/code.jpg",
				url: "/flow-training-camp/pdf/demystifying-programming.pdf",
			},
			{
				type: "pdf",
				title: "Application: automation",
				img: "/flow-training-camp/img/automation.jpg",
				url: "/flow-training-camp/pdf/application-automation.pdf",
			},
			{
				type: "pdf",
				title: "Your mission",
				img: "",
				url: "/flow-training-camp/pdf/your-mission.pdf",			
			},
		],
	},
	subsystems: [
		{
			title: "The Maze",
			requirements: [],
			imgSrc: "/flow-training-camp/img/1.png",
			description: "We will start by learning what action blocks are and how to sequence them together to enable our robot to navigate through a fixed maze.",
			research: {
				threshold: 60,
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Intro to functions",
						url: "/flow-training-camp/pdf/functions.pdf",
					},
					{
						type: "pdf",
						title: "Flow: Action blocks",
						url: "/flow-training-camp/pdf/action-blocks.pdf",
					},
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
 		/* {
			title: "Balloon Throwing",
			requirements: ["Speed control"],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/heat-seeker/img/2.PNG",
			description: "We will now program our robot to detect small curves in the line and adjust its movement accordingly by setting different speeds to each motor.",
			research: {
				threshold: 120,
				caption: ["Work through the four modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Introduction to Flow blocks",
						url: "/heat-seeker/pdf/Subproblem2.pdf",
					},
					{
						type: "pdf",
						title: "Sensing blocks",
						url: "/heat-seeker/pdf/Iter_1.pdf",
					},
					{
						type: "explore",
						title: "Explore more",
						items: [comparisonBoostData, ifBoostData],
					},
				],
			},
			plan: {
				threshold: 300,
				list: [
					"Think back to when you were manually controlling the robot... What information were you using to decide which action to perform?",
					"In this step, our aim is to create a plan for how our robot could navigate around multiple curves.",
					"But first, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section for subsystem 2. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 300,
				tasks: ["Upgrade your code so that your robot can follow the line using the sensors."],
				hints: [
					"You will need to use a sensor to detect the line and adjust the speed of the wheels.",
					"Your robot only has a limited amount of water, so make sure that you turn the hose off after you put out each fire.",
				],
			},
			blockList: [
				{ name: "Actions", blocks: [<NodeTrainingBotThrowBalloonMini />] },
				{ name: "Operators", blocks: [<NodeTrainingBotAddMini />, <NodeTrainingBotSubMini />, <NodeTrainingBotMulMini />, <NodeTrainingBotDivMini />] },
				{ name: "Utilities", blocks: [<NodePrintMini />] },
			],
		},  */
		{
			title: "Tyre Pumping",
			requirements: ["The Maze"],
			imgSrc: "/flow-training-camp/img/3.png",
			description: "Learn how to use a while loop to perform the same action multiple times. In this case, inflating a tire to the perfect pressure.",
			research: {
				threshold: 300,
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Intro to comparisons",
						url: "/flow-training-camp/pdf/comparisons.pdf",
					},
					{
						type: "pdf",
						title: "Intro to while loops",
						url: "/flow-training-camp/pdf/while-loops.pdf",
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
				{ name: "Sensing", blocks: [<NodeTrainingBotGetTyrePressureMini/>] },
				{ name: "Actions", blocks: [<NodeTrainingBotPumpTyreMini />] },
				{ name: "Conditionals", blocks: [<NodeWhileMini />] },
				{ name: "Logicals", blocks: [<NodeLessThanMini/>, ] },
				{ name: "Utilities", blocks: [<NodePrintMini />] }
			],
		},
		{
			title: "Banana Sorting",
			requirements: ["The Maze", "Tyre Pumping"],
			imgSrc: "/flow-training-camp/img/2.png",
			description: "Use sensors to determine the physical properties of a banana, then pull the right lever to sort it into the correct crate.",
			research: {
				threshold: 60,
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Intro to booleans & logicals",
						url: "/flow-training-camp/pdf/logicals.pdf",
					},
					{
						type: "pdf",
						title: "Flow: Banana sorting",
						url: "/flow-training-camp/pdf/banana-sorting.pdf",
					},
				],
			},
			plan: {
				threshold: 30,
				list: [
					"Open up your learning journal and answer all of the questions in the Plan section for subsystem 2. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 120,
				tasks: ["Test the robot's ability to use sensor data to make decisions by sorting bananas into the correct crate."],
				hints: [
					"Think about each possible colour combination for the bananas. For each combination, what is the right action to perform?",
					"Before you leave the simulation, click the save button in the bottom left menu so that you can continue writing your code where you left off when you return!",
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
			title: "Red Light Green Light",
			requirements: ["The Maze", "Tyre Pumping", "Banana Sorting"],
			imgSrc: "/flow-training-camp/img/4.png",
			description: "IF statements? WHILE loops? We will learn how to use them to cross a road without getting hit by traffic.",
			research: {
				threshold: 1,
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Intro to IF statements",
						url: "/flow-training-camp/pdf/banana-sorting.pdf",
					},
					{
						type: "pdf",
						title: "Intro to comparisons II",
						url: "/flow-training-camp/pdf/banana-sorting.pdf",
					},
				],
			},
			plan: {
				threshold: 30,
				list: [
					"Open up your learning journal and answer all of the questions in the Plan section for subsystem 2. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
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
