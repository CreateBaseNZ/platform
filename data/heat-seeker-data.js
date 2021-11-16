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
	numOfLessons: 9,
	difficulty: "Advanced",
	subjects: ["Technology", "Engineering", "Computer Science", "Fire Safety"],
	learningOutcome: "/heat-seeker/files/project-overview.pdf",
	curriculumAlignment: "/heat-seeker/files/curriculum-alignment.pdf",
	lessonPlan: "/heat-seeker/files/lesson-plan-heat-seeker.pdf",
	learnings: [
		"Explain how and why line-following is used for navigation.",
		"Understand why we decompose problems.",
		"Understand the fundamentals of flow-based coding and write code using the Flow editor.",
		"Describe DC motors and outline how they work (optional).",
		"Describe IR sensors and outline how they work.",
		"Define comparators and conditionals.",
		"Write programs that use sensor data to control an output.",
		"Use logical reasoning to derive simple and more complex algorithms.",
		"Write programs that use conditional statements to control an output.",
		"Differentiate between different types of fires and how to deal with them.",
		"Define while loops and use them to solve problems.",
		"Explore ways a solution can be optimised.",
	],
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
				url: "/heat-seeker/files/12050102AB-imagine_page1.pdf",
			},
			{
				title: "Define Our Solution",
				img: "/heat-seeker/img/define.jpg",
				url: "/heat-seeker/files/12050102AB-imagine_page2.pdf",
			},
			{
				title: "Define Our Solution",
				img: "/heat-seeker/img/define.jpg",
				url: "/heat-seeker/files/12050102AB-imagine_page3.pdf",
			},
		],
	},
	subsystems: [
		{
			title: "Speed control",
			requirements: [],
			imgSrc: "/heat-seeker/img/thumbnail.png", // TODO
			description: "Lorem ipsum dolor sit amet. Et sint illo vel nulla eligendi et repudiandae quia est architecto error et quia asperiores sed natus molestiae est enim rerum", // TODO
			research: {
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "task",
						title: "Task: Line following",
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
						url: "/heat-seeker/pdf/Subproblem1.pdf",
					},
					{
						type: "pdf",
						title: "Action blocks",
						url: "/heat-seeker/pdf/Iter_0.pdf",
					},
					{
						type: "task",
						title: "Task: Actions",
						url: "/heat-seeker/files/Research-heat-seeker-1.pdf",
					},
				],
			},
			plan: [
				"Think back to when you were manually controlling the robot... What actions were you performing? What information were you using to decide which action to perform?",
				"In the first step, our aim is to understand how we could move the robot through different paths by adjusting the speed of the wheels.",
				"But first, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section for step 1. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
			],
			code: {
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["Write some code so that your robot can drive forward, following a straight line accross the map."],
				hints: [
					"You need to use the action blocks to adjust the speed of the wheels to get it done.",
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it for future steps.",
				],
			},
			blockList: [{ name: "Actions", blocks: [<NodeHeatSeekerLeftWheelMini />, <NodeHeatSeekerRightWheelMini />] }],
		},
		{
			title: "Navigating curves",
			requirements: ["Speed control"],
			imgSrc: "/heat-seeker/img/thumbnail.png", // TODO
			description: "Lorem ipsum dolor sit amet. Et sint illo vel nulla eligendi et repudiandae quia est architecto error et quia asperiores sed natus molestiae est enim rerum", // TODO
			research: {
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
						type: "task",
						title: "Task: Sensing",
						url: "/heat-seeker/files/Research-heat-seeker-2.pdf",
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
			code: {
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
			title: "Navigating turns",
			requirements: ["Speed control"],
			imgSrc: "/heat-seeker/img/thumbnail.png", // TODO
			description: "Lorem ipsum dolor sit amet. Et sint illo vel nulla eligendi et repudiandae quia est architecto error et quia asperiores sed natus molestiae est enim rerum", // TODO
			research: {
				caption: ["There is no research step. Move onto Plan."],
				modules: [],
			},
			plan: [
				"Think back to when you were manually controlling the robot... What actions were you performing? What information were you using to decide which action to perform?",
				"In this step, our aim is to create a plan for how our robot could navigate around multiple turns.",
				"But first, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
			],
			code: {
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
		},
		{
			title: "Extinguishing fires",
			requirements: [],
			imgSrc: "/heat-seeker/img/thumbnail.png", // TODO
			description: "Lorem ipsum dolor sit amet. Et sint illo vel nulla eligendi et repudiandae quia est architecto error et quia asperiores sed natus molestiae est enim rerum", // TODO
			research: {
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "task",
						title: "Task: Fire fighting",
						url: "/heat-seeker/files/Research-01-heat-seeker.pdf",
					},
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
						type: "task",
						title: "Task: Fire",
						url: "/heat-seeker/files/Research-heat-seeker-4.pdf",
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
			code: {
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
			title: "Putting it all together",
			requirements: ["Navigating curves", "Navigating turns", "Extinguishing fires"],
			imgSrc: "/heat-seeker/img/thumbnail.png", // TODO
			description: "Lorem ipsum dolor sit amet. Et sint illo vel nulla eligendi et repudiandae quia est architecto error et quia asperiores sed natus molestiae est enim rerum", // TODO
			research: {
				caption: ["There is no research step. Move onto Plan."],
				modules: [],
			},
			plan: [
				"Think back to when you were manually controlling the robot... What actions were you performing? What information were you using to decide which action to perform?",
				"In this step, we will combine all of the logic and solutions that we have built so far to solve the full problem: navigating around the entire warehouse and putting out any fires in our way.",
				"But first, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
			],
			code: {
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
