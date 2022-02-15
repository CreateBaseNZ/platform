import { NodeGreaterThanMini, NodeLessThanMini } from "../components/Nodes/NodeComparisons";
import { NodeIfMini, NodeWhileMini } from "../components/Nodes/NodeConditionals";
import {
	NodeHeatSeekerFireSensorMini,
	NodeHeatSeekerLeftSensorMini,
	NodeHeatSeekerLeftWheelMini,
	NodeHeatSeekerMiddleSensorMini,
	NodeHeatSeekerRightSensorMini,
	NodeHeatSeekerRightWheelMini,
	NodeHeatSeekerWaterHoseMini,
} from "../components/Nodes/NodeHeatSeeker";
import { NodeAndMini, NodeNotMini, NodeOrMini } from "../components/Nodes/NodeLogicals";
import { NodeAbsoluteMini, NodeAddMini, NodeDivideMini, NodeMultiplyMini, NodeSubtractMini } from "../components/Nodes/NodeOperations";
import { COMPUTER_SCIENCE, ENGINEERING, FIRE_SAFETY, TECHNOLOGY } from "../constants/projectSubjects";

export default {
	name: "Flow Training Camp",
	query: "flow-training-camp",
	caption: "TBD",
	stacked: true,
	scenePrefix: "Project_FlowTrainingCamp",
	runType: "loop",
	durPerLesson: "45 mins",
	numOfLessons: 6,
	difficulty: "introductory",
	subjects: [TECHNOLOGY, ENGINEERING, COMPUTER_SCIENCE],
	learningOutcome: "/heat-seeker/files/project-overview.pdf",
	curriculumAlignment: "/heat-seeker/files/curriculum-alignment.pdf",
	lessonPlan: "/heat-seeker/files/lesson-plan-heat-seeker.pdf",
	learnings: ["TBD"],
	define: {
		threshold: 60,
		url: "https://youtu.be/a7ahjbh_lUg",
		src: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/heat-seeker/vid/situation.mp4",
		h1: "TBD",
		h2: "TBD",
		title: "Flow Training Camp",
		docs: "https://docs.google.com/document/d/1N8EoifM1ab4bYGe-sQOeHM4aCjCaAqrb8vyBBag7u4A/edit",
		word: "/heat-seeker/files/learning-journal-heat-seeker.docx",
	},
	imagine: {
		threshold: 120,
		caption: [
			"As a class, dive into group discussions around the Project theme to fully define our problem.",
			"Your educator will let you know if they want you to answer these questions in your learning journal individually, as a group, or as a class discussion.",
		],
		modules: [
			{
				type: "pdf",
				title: "Our problem",
				img: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/heat-seeker/img/imagine_1.jpg",
				url: "/heat-seeker/files/12050102AB-imagine_page1.pdf",
			},
			{
				type: "pdf",
				title: "Our solution",
				img: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/heat-seeker/img/thumbnail.png",
				url: "/heat-seeker/files/12050102AB-imagine_page2.pdf",
			},
			{
				type: "pdf",
				title: "Your approach",
				img: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/heat-seeker/img/imagine_3.jpg",
				url: "/heat-seeker/files/12050102AB-imagine_page3.pdf",
			},
		],
	},
	subsystems: [
		{
			title: "Subsystem 1",
			requirements: [],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/heat-seeker/img/1.png",
			description: "TBD",
			research: {
				threshold: 300,
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
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
						url: "/heat-seeker/pdf/Subproblem1.pdf",
					},
					{
						type: "pdf",
						title: "Action blocks",
						url: "/heat-seeker/pdf/Iter_0.pdf",
					},
				],
			},
			plan: {
				threshold: 60,
				list: ["TBD"],
			},
			code: {
				threshold: 120,
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["TBD"],
				hints: ["TBD", "Click the save button in the bottom left menu when you have finished writing your code so that you can access it for future steps."],
			},
			blockList: [{ name: "Actions", blocks: [<NodeHeatSeekerLeftWheelMini />, <NodeHeatSeekerRightWheelMini />] }],
		},
		{
			title: "Subsystem 2",
			requirements: ["TBD"],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/heat-seeker/img/2.PNG",
			description: "TBD",
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
				],
			},
			plan: {
				threshold: 300,
				list: ["TBD"],
			},
			code: {
				threshold: 300,
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["TBD"],
				hints: ["TBD"],
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
			title: "Subsystem 3",
			requirements: ["TBD"],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/heat-seeker/img/3.png",
			description: "TBD",
			research: {
				threshold: 1,
				caption: ["There is nothing new to research for this subsystem. You can continue to Plan."],
				modules: [],
			},
			plan: {
				threshold: 300,
				list: ["TBD"],
			},
			code: {
				threshold: 300,
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["TBD"],
				hints: ["TBD"],
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
			title: "Putting it all together",
			requirements: ["TBD"],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/heat-seeker/img/thumbnail.png",
			description: "TBD",
			research: {
				threshold: 1,
				caption: ["There is nothing new to research for this subsystem. You can continue to Plan."],
				modules: [],
			},
			plan: {
				threshold: 30,
				list: ["TBD"],
			},
			code: {
				threshold: 120,
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["TBD"],
				hints: ["TBD", "Click the save button in the bottom left menu when you have finished writing your code so that you can access it in the Improve step."],
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
		threshold: 600,
		caption: "Test what you’ve learnt by taking on more challenges. There are always ways to make your solution smarter, faster, stronger!",
		alert: "TBD",
		tasks: ["TBD"],
		hints: ["TBD"],
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
