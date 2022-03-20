import { NodeEqualsMini, NodeGreaterThanMini, NodeLessThanMini, NodeNotEqualsMini, NodeTrueMini, NodeFalseMini} from "../components/Nodes/NodeComparisons";
import { NodeIfMini, NodeWhileMini } from "../components/Nodes/NodeConditionals";
import {
	NodeTrainingBotGetBananaGreenMini,
	NodeTrainingBotGetBananaYellowMini,
	NodeTrainingBotGetBananaBrownMini,
	NodeTrainingBotGetTrafficLightMini,
	NodeTrainingBotGetTyrePressureMini,
	NodeTrainingBotGetSlipLevelMini,
	NodeTrainingBotGetTargetDistanceMini,
	NodeTrainingBotPullLeverMini,
	NodeTrainingBotPunchMini,
	NodeTrainingBotTurnLeftMini,
	NodeTrainingBotTurnRightMini,
	NodeTrainingBotMoveForwardMini,
	NodeTrainingBotPumpTyreMini,
	NodeTrainingBotWalkMini,
	NodeTrainingBotStopMini,
	NodeTrainingBotThrowBalloonMini,
	NodeTrainingBotThrowConstantMini,
} from "../components/Nodes/NodeTrainingCamp";
import { NodePrintMini, NodeDelayMini } from "../components/Nodes/NodeUtils";
import { NodeAndMini, NodeNotMini, NodeOrMini} from "../components/Nodes/NodeLogicals";
import { NodeAbsoluteMini, NodeAddMini, NodeDivideMini, NodeMultiplyMini, NodeSubtractMini, NodeSqrtMini } from "../components/Nodes/NodeOperations";
import { COMPUTER_SCIENCE, TECHNOLOGY } from "../constants/projectSubjects";
import { IProjectReadOnly } from "../types/projects";
import { comparisonBoostData, ifBoostData, whileBoostData } from "./explore-data";

const INTRO_TO_PROGRAMMING_DATA: IProjectReadOnly = {
	name: "Intro to Programming",
	query: "intro-to-programming",
	caption:
		"Learn the fundamentals of programming using the Flow visual language. Flow is synonymous with creating flow charts, so you can focus on learning programming logic without having to memorize arbitrary syntax! In this Project, you will be programming an automation robot to complete a variety of tests to see if it is ready to send out into the world.",
	stacked: true,
	scenePrefix: "Project_TrainingCamp",
	runType: "loop",
	durPerLesson: "45 mins",
	numOfLessons: 5,
	difficulty: "advanced",
	subjects: [TECHNOLOGY, COMPUTER_SCIENCE],
	flowCodingOnly: true,
	spotlight: "https://www.youtube.com/embed/QuBgQqHQzns",
	learningOutcome: "/intro-to-programming/files/project-overview-intro-to-programming.pdf",
	cads: {
		nz: "/intro-to-programming/cads/020802AG Curriculum Alignment - Intro to Programming - NZ.pdf",
		aus: "/intro-to-programming/cads/020802AG Curriculum Alignment - Intro to Programming - ACARA.pdf",
		cali: "/intro-to-programming/cads/020802AG Curriculum Alignment - Intro to Programming - California.pdf",
		uk: "/intro-to-programming/cads/020802AG Curriculum Alignment - Intro to Programming - England.pdf",
	},
	lessonPlan: "/intro-to-programming/files/lesson-plan-intro-to-programming.pdf",
	learnings: [
		"Explain what programming is and why it is important",
		"Explain what an algorithm is and why they are important",
		"Implement simple algorithms using Flow, a visual programming language",
		"Explain what automation is using examples and describe its basic impacts on humanity",
		"Define the purpose of functions and create a simple sequential program with functions using Flow",
		"Define a sensor using examples and explain why they are important in robotics",
		"Use sensors and mathematical operations to create a dynamic program",
		"Define the purpose of a while loop and use one to create a simple iterative program",
		"Define the purpose of simple logical statements and use a combination to create a more advanced dynamic program",
		"Define the purpose of an IF statement and use one to create a simple branching program",
	],
	define: {
		threshold: 60,
		url: "https://www.youtube.com/watch?v=qsRFNAa3iaY",
		src: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/intro-to-programming/vid/situation.mp4",
		h1: "Welcome to CreateBase headquarters! In this testing facility, humanoid robots are built and programmed for the purpose of assisting humans to perform everyday tasks.",
		h2: "As a testing officer, your job is assess the capabilities of the latest robot design. You will do this by creating programs that will enable the robot to progress through a series of increasingly difficult tests. If successful, your robot will be approved for release into the world! To get started, make a copy of one of the learning journals:",
		docs: "https://docs.google.com/document/d/1PnUV4NtGB-ddr6ukNZiNdK6KRjisSoj8rzn3KgDT1MQ/edit",
		word: "/intro-to-programming/files/learning-journal-intro-to-programming.docx",
	},
	imagine: {
		threshold: 120,
		modules: [
			{
				type: "pdf",
				title: "Demystifying programming",
				img: "/intro-to-programming/img/code.jpg",
				url: "/intro-to-programming/pdf/demystifying-programming.pdf",
			},
			{
				type: "pdf",
				title: "Application: automation",
				img: "/intro-to-programming/img/automation.jpg",
				url: "/intro-to-programming/pdf/application-automation.pdf",
			},
			{
				type: "pdf",
				title: "Your mission",
				img: "",
				url: "/intro-to-programming/pdf/your-mission.pdf",			
			},
		],
	},
	subsystems: [
		{
			title: "The Maze",
			requirements: [],
			imgSrc: "/intro-to-programming/img/maze.png",
			description: "We will start by learning what action blocks are and how to sequence them together to enable our robot to navigate through a fixed maze.",
			research: {
				threshold: 60,
				caption: ["Work through ALL of the modules below to complete your research.", "After completing each card, return to your learning journal to solidify your understanding by answering some simple questions!"],
				modules: [
					{
						type: "pdf",
						title: "Intro to functions",
						url: "/intro-to-programming/pdf/functions.pdf",
					},
					{
						type: "pdf",
						title: "Flow: Action blocks",
						url: "/intro-to-programming/pdf/action-blocks.pdf",
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
 		{
			title: "Balloon Throwing",
			requirements: ["The Maze"],
			imgSrc: "/intro-to-programming/img/water-balloon.png",
			description: "We will now program our robot to use sensor data and math blocks to calculate the correct input for an action block.",
			research: {
				threshold: 120,
				caption: ["Work through the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Flow: Sensor blocks",
						url: "/intro-to-programming/pdf/sensing-blocks.pdf",
					},
					{
						type: "pdf",
						title: "Flow: Operation blocks",
						url: "/intro-to-programming/pdf/operation-blocks.pdf",
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
				threshold: 300,
				tasks: ["Write some code that will tell the robot to throw a water balloon with the correct amount of power so that it hits a target."],
				hints: [
					"You will need to use a sensor to retrieve the throwing constant for the angle that the robot is currently aiming at.",
					"You will need to use math blocks to calculate the correct power using the distance and throwing constant.",
				],
			},
			blockList: [
				{ name: "Sensing", blocks: [<NodeTrainingBotGetTargetDistanceMini />, <NodeTrainingBotThrowConstantMini/>] },
				{ name: "Actions", blocks: [<NodeTrainingBotThrowBalloonMini />] },
				{ name: "Operators", blocks: [<NodeAddMini />, <NodeSubtractMini />, <NodeMultiplyMini />, <NodeDivideMini />, <NodeSqrtMini />] },
				{ name: "Utilities", blocks: [<NodePrintMini />] },
			],
		},
		{
			title: "Tyre Pumping",
			requirements: ["Balloon Throwing"],
			imgSrc: "/intro-to-programming/img/tyre.png",
			description: "Learn how to use a while loop to perform the same action multiple times. In this case, inflating a tyre to the perfect pressure.",
			research: {
				threshold: 300,
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Flow: Comparison blocks",
						url: "/intro-to-programming/pdf/comparisons.pdf",
					},
					{
						type: "pdf",
						title: "Flow: While blocks",
						url: "/intro-to-programming/pdf/while-loops.pdf",
					},
				],
			},
			plan: {
				threshold: 30,
				list: [
					"Open up your learning journal and answer all of the questions in the Plan section for subsystem 3. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 120,
				tasks: ["Write some code so that your robot will inflate a tire to the correct pressure."],
				hints: [
					"If you inflate the tyre too much it will explode!",
					"You will need to use a sensor to detect the current pressure of the tyre.",
					"The optimal solution uses a WHILE block and a single Pump Tyre block",
					"You will need to use a comparison block to compare the current pressure of the tyre to the target pressure. This would probably be a good condition for your WHILE block.",
				],
			},
			blockList: [
				{ name: "Sensing", blocks: [<NodeTrainingBotGetTyrePressureMini />] },
				{ name: "Actions", blocks: [<NodeTrainingBotPumpTyreMini />] },
				{ name: "Conditionals", blocks: [<NodeWhileMini />] },
				{ name: "Comparisons", blocks: [<NodeLessThanMini/>, <NodeGreaterThanMini/>] },
				{ name: "Utilities", blocks: [<NodePrintMini />] }
			],
		},
		{
			title: "Banana Sorting",
			requirements: ["Tyre Pumping"],
			imgSrc: "/intro-to-programming/img/banana.png",
			description: "Use sensors to determine the physical properties of a banana, then use a combination of logical statements to pull the right lever to sort it into the correct crate.",
			research: {
				threshold: 60,
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Flow: Booleans & logical blocks",
						url: "/intro-to-programming/pdf/logicals.pdf",
					},
					{
						type: "pdf",
						title: "Flow: Banana sorting",
						url: "/intro-to-programming/pdf/banana-sorting.pdf",
					},
				],
			},
			plan: {
				threshold: 30,
				list: [
					"Open up your learning journal and answer all of the questions in the Plan section for subsystem 4. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
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
				{ name: "Conditionals", blocks: [<NodeWhileMini />] },
				{ name: "Comparisons", blocks: [<NodeLessThanMini/>, <NodeGreaterThanMini/>, <NodeTrueMini />, <NodeFalseMini />] },
				{ name: "Logicals", blocks: [<NodeNotMini />, <NodeAndMini />, <NodeOrMini />] },
				{ name: "Utilities", blocks: [<NodePrintMini />] }
			],
		},
		{
			title: "Red Light Green Light",
			requirements: ["Banana Sorting"],
			imgSrc: "/intro-to-programming/img/traffic.png",
			description: "IF statements? We will learn how to use them to cross a road without getting hit by traffic.",
			research: {
				threshold: 60,
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Intro to IF statements",
						url: "/intro-to-programming/pdf/if-statements.pdf",
					},
					{
						type: "pdf",
						title: "Flow: IF blocks",
						url: "/intro-to-programming/pdf/if-blocks.pdf",
					},
					{
						type: "pdf",
						title: "Flow: Comparisons part II",
						url: "/intro-to-programming/pdf/comparisons-2.pdf",
					},
				],
			},
			plan: {
				threshold: 30,
				list: [
					"Open up your learning journal and answer all of the questions in the Plan section for subsystem 5. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 120,
				tasks: ["Write some code to enable your robot to use traffic light signals to safely cross a road."],
				hints: [
					"You will need to use both a WHILE loop and an IF statement.",
					"Before you leave the simulation, click the save button in the bottom left menu so that you can continue writing your code where you left off when you return!",
				],
			},
			blockList: [
				{ name: "Sensing", blocks: [<NodeTrainingBotGetTrafficLightMini />], },
				{ name: "Actions", blocks: [<NodeTrainingBotWalkMini />, <NodeTrainingBotStopMini />], },
				{ name: "Conditionals", blocks: [<NodeIfMini />, <NodeWhileMini />], },
				{ name: "Comparisons", blocks: [<NodeNotEqualsMini />, <NodeEqualsMini />, <NodeLessThanMini/>, <NodeGreaterThanMini/>, <NodeTrueMini />, <NodeFalseMini />] },
				{ name: "Logicals", blocks: [<NodeNotMini />, <NodeAndMini />, <NodeOrMini />] },
				{ name: "Utilities", blocks: [<NodePrintMini />] }
			],
		},
	],
	improve: {
		threshold: 300,
		alert:
			"Congratulations! If you managed to complete all of the subsystems, then you have not only successfully tested the robot, but you have also proven your skills as a programmer and a problem solver. But, there is still one more bonus test to go; if you are feeling up to it...",
		tasks: [
			"In the Improve step, you will repeat the final test but with a new addition:",
			"The roof of the testing facility has been opened, and there is a high chance of snow. When it is snowing, the road becomes icy and your robot will take a bit of time to slow down to a stop. The harder its snowing, the more time it will take the robot to stop. Your robot can detect how slippery the road is with a sensor.",
			//"Cars are now travelling at different speeds. Your robot has a sensor that can detect the speed on incoming cars.",
			"You task is to optimise your solution to try and reach the other side of the road as fast as possible.",
		],
		hints: [
			"While it is snowing, you will have to stop moving before the red light, or else your robot will slide into the traffic.",
			"How early your robot needs to stop before the red light depends on how much it is snowing.",
			"You can use a Delay block to pause your program for the specified amount of seconds - like to wait for a light to change colour. Note that the delay block doesn't scale with the speed of the simulation, so we recommend keeping the speed at 1x.",
		],
		blockList: [
			{ name: "Sensing", blocks: [<NodeTrainingBotGetTrafficLightMini />, <NodeTrainingBotGetSlipLevelMini/>], },
			{ name: "Actions", blocks: [<NodeTrainingBotWalkMini />, <NodeTrainingBotStopMini />], },
			{ name: "Conditionals", blocks: [<NodeIfMini />, <NodeWhileMini />], },
			{ name: "Operators", blocks: [<NodeAddMini />, <NodeSubtractMini />, <NodeMultiplyMini />, <NodeDivideMini />, <NodeSqrtMini />] },
			{ name: "Comparisons", blocks: [<NodeNotEqualsMini />, <NodeEqualsMini />, <NodeLessThanMini/>, <NodeGreaterThanMini/>, <NodeTrueMini />, <NodeFalseMini />] },
			{ name: "Logicals", blocks: [<NodeNotMini />, <NodeAndMini />, <NodeOrMini />] },
			{ name: "Utilities", blocks: [<NodePrintMini />, <NodeDelayMini />] }
		],
	},
};

export default INTRO_TO_PROGRAMMING_DATA;
