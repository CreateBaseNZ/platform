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
import { COMPUTER_SCIENCE, ENGINEERING, FIRE_SAFETY, TECHNOLOGY } from "../constants/projectSubjects";
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
		threshold: 60,
		url: "https://youtu.be/a7ahjbh_lUg",
		src: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/heat-seeker/vid/situation.mp4",
		h1: "An overloaded electrical circuit has resulted in a wooden pallet catching fire inside a warehouse! Explosive hydrogen fuel cells are located inside, posing a danger to any firefighters who would enter the warehouse.",
		h2: "Sending human fire-fighters into the warehouse would be extremely dangerous as there is a risk that an explosion could occur at any time. Luckily, this warehouse utilizes line-following robots to move items around. Maybe we could program one of them to find and put out the fires safely...",
		title: "Heat Seeker",
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
			title: "Speed control",
			requirements: [],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/heat-seeker/img/1.png",
			description: "In this first subsystem, we will program our robot to move by individually setting the rotational speed of each of two motors.",
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
				list: [
					"Think back to when you were manually controlling the robot... What actions were you performing? What information were you using to decide which action to perform?",
					"In the first step, our aim is to understand how we could move the robot through different paths by adjusting the speed of the wheels.",
					"But first, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section for subsystem2 1. If you get stuck, ask one of your classmates for help but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 120,
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
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/heat-seeker/img/2.PNG",
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
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/heat-seeker/img/3.png",
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
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/heat-seeker/img/4.PNG",
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
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/heat-seeker/img/thumbnail.png",
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
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["Write some code so that your robot can follow the line, putting out fires along the way."],
				hints: [
					"You will need to use the fire sensor to detect the fire. Move through the map to find all the fires",
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it in the Improve step.",
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
		threshold: 600,
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
