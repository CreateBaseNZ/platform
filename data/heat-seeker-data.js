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
} from "../components/ReactFlow/NodeHeatSeeker";
import { NodeAndMini, NodeNotMini, NodeOrMini } from "../components/ReactFlow/NodeLogicals";
import { NodeAbsoluteMini, NodeAddMini, NodeDivideMini, NodeMultiplyMini, NodeSubtractMini } from "../components/ReactFlow/NodeOperations";
import { comparisonBoostData, ifBoostData, whileBoostData } from "./explore-data";

export default {
	name: "Heat Seeker",
	query: "heat-seeker",
	caption:
		"In this Project, learners will create an algorithm to guide a line-following robot to a series of fires within a warehouse, putting them out safely before they spread to nearby hydrogen fuel cells! Learners will not only create their own control-algorithm, but will also learn about some of the basics of fire safety, warehouse automation, and the advantage that robots have over humans when operating in hazardous situations.",
	stacked: true,
	scenePrefix: "Project_HeatSeeker",
	runType: "loop",
	durPerLesson: "45 mins",
	numOfLessons: 6,
	difficulty: "Advanced",
	subjects: ["Technology", "Engineering", "Computer Science", "Fire Safety"],
	learningOutcome: "TBD",
	curriculumAlignment: "TBD",
	lessonPlan: "TBD",
	learnings: ["TBD"],
	define: {
		url: "https://youtu.be/a7ahjbh_lUg",
		src: "/heat-seeker/vid/situation.mp4",
		h1: "An overloaded electrical circuit has resulted in a wooden pallet catching fire inside a warehouse! Explosive hydrogen fuel cells are located inside, posing a danger to any firefighters who would enter the warehouse.",
		h2: "Sending human fire-fighters into the warehouse would be extremely dangerous as there is a risk that an explosion could occur at any time. Luckily, this warehouse utilizes line-following robots to move items around. Maybe we could program one of them to find and put out the fires safely...",
		title: "Heat Seeker",
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
				img: "/heat-seeker/img/define.jpg",
				url: "/heat-seeker/files/12050102AB-imagine.pdf",
			},
		],
	},
	iterations: [
		{
			research: {
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Line Following",
						url: "/heat-seeker/files/Research-02-heat-seeker.pdf",
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
						url: "/intro-to-flow.pdf",
					},
					{
						type: "pdf",
						title: "Tips & tricks: Action blocks",
						url: "/heat-seeker/pdf/Iter_0.pdf",
					},
				],
			},
			plan: [
				"Think back to when you were manually controlling the robot... What actions were you performing? What information were you using to decide which action to perform?",
				"In the first step, our aim is to understand how we could move the robot through different paths by adjusting the speed of the wheels.",
				"But first, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section for step 1. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
			],
			create: {
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["Write some code so that your robot can drive forward, following a straight line accross the map."],
				hints: [
					"You need to use the action blocks to adjust the speed of the wheels to get it done.",
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it for future steps.",
				],
			},
			blockList: [{ name: "Actions", blocks: [<NodeHeatSeekerLeftWheelMini />, <NodeHeatSeekerRightWheelMini />] }],
			// improve: {
			// 	caption: "Test what you’ve learnt by taking on more challenges. There are always ways to make your solution smarter, faster, stronger!",
			// 	alert:
			// 		"Oh no, it looks like some of the fires have spread throughout the warehouse! You will now need to use your water hose to put out the smaller fires on the way to your final destination.",
			// 	tasks: [
			// 		"Congratulations on successfully creating a line following algorithm! You will now need improve your solution to take into account the smaller fires.",
			// 		"We will go through another iteration, repeating the same process that we just completed to build up our improved solution.",
			// 	],
			// },
		},
		{
			// define: {
			// 	caption: [
			// 		"As a class, dive into group discussions around the Project theme to fully define our problem.",
			// 		"Don't have a teacher to guide you through? Check back soon for individual content!",
			// 	],
			// 	modules: [
			// 		{
			// 			title: "Define the New Problem",
			// 			img: "/heat-seeker/img/define-1.jpg",
			// 			url: "/heat-seeker/files/define-1-heat-seeker.pdf",
			// 		},
			// 	],
			// },
			research: {
				caption: ["Work through the four modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Line Following - Our Improved Solution",
						url: "/heat-seeker/files/Research-11-heat-seeker.pdf",
					},
					{
						type: "pdf",
						title: "Tips & tricks: Action blocks",
						url: "/heat-seeker/pdf/Iter_1.pdf",
					},
					{
						type: "explore",
						title: "Explore more",
						items: [comparisonBoostData, ifBoostData],
					},
				],
			},
			plan: [
				"Think back to when you were manually controlling the robot... What information were you using to decide which action to perform?",
				"In this step, our aim is to create a plan for how our robot could navigate around multiple curves.",
				"But first, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section for step 1. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
			],
			// plan: [
			// 	"In the next Create step, you will need to improve your program so that you can put out the fires on the way to your destination.",
			// 	"But first, we need to plan what our changes will be. Open up your learning journal and answer all of the questions in the second Plan section. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
			// ],
			create: {
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["Upgrade your code so that your robot can follow the line using the sensors."],
				hints: [
					"You will need to use a sensor to detect the line and adjust the speed of the wheels.",
					"Your robot only has a limited amount of water, so make sure that you turn the hose off after you put out each fire.",
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
				"Think back to when you were manually controlling the robot... What actions were you performing? What information were you using to decide which action to perform?",
				"In this step, our aim is to create a plan for how our robot could navigate around multiple turns.",
				"But first, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
			],
			create: {
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["Upgrade your code so that your robot can follow the line achieve turns properly."],
				hints: [
					"You will need to use a sensor to detect the line and differentiate between curves and turns.",
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
			// improve: {
			// 	caption: "Test what you’ve learnt by taking on more challenges. There are always ways to make your solution smarter, faster, stronger!",
			// 	alert:
			// 		"Oh no, it looks like some of the fires have spread throughout the warehouse! You will now need to use your water hose to put out the smaller fires on the way to your final destination.",
			// 	tasks: [
			// 		"Congratulations on successfully creating a line following algorithm! You will now need improve your solution to take into account the smaller fires.",
			// 		"We will go through another iteration, repeating the same process that we just completed to build up our improved solution.",
			// 	],
			// },
		},
		{
			research: {
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Fire Fighting",
						url: "/heat-seeker/files/Research-01-heat-seeker.pdf",
					},
					{
						type: "pdf",
						title: "Tips & tricks: Sensing & Action blocks",
						url: "/heat-seeker/pdf/Iter_3.pdf",
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
				"In this step, our aim is to create a plan for how our robot could put out fires using the water hose",
				"But first, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
			],
			create: {
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["Write some code so that your robot can drive forward, putting out fires along the way."],
				hints: [
					"You need to use the fire sensor to detect the fire.",
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
				"In this step, we will combine all of the logic and solutions that we have built so far to solve the full problem: navigating around the entire warehouse and putting out any fires in our way.",
				"But first, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
			],
			create: {
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["Write some code so that your robot can follow the line, putting out fires along the way."],
				hints: [
					"You will need to use the fire sensor to detect the fire. Move through the map to find all the fires",
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
		hints: [
			"If you want an additional challenge, try and re-create your solution in this Improve step by solving the problem as few blocks as possible.",
			"Alternatively, you could continue improving your solution to try and put out all the fires in the shortest possible time.",
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
