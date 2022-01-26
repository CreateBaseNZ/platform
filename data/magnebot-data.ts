import { AUTOMATION, COMPUTER_SCIENCE, ENGINEERING, MATH, SOCIAL_SCIENCE, TECHNOLOGY } from "../constants/projectSubjects";
import { IProjectReadOnly } from "../types/projects";

// TODO - update this file when type gets updated

const MAGNEBOT_DATA: IProjectReadOnly = {
	id: "magnebot",
	title: "MagneBot",
	subtitle: "The coordinate-guided robotic arm",
	description:
		"In this Project, users will control the MagneBot robotic arm using logical flow-based programming to clean up a recycling facility. Users will learn the basics of the Flow programming language and how to convert their thinking into instructions for the robot. Along the way, they will also gain an understanding of recycling and how robotic systems can be used to carry out tasks traditionally performed by humans.",
	runType: "once",
	cads: {
		nz: "/projects/magnebot/cads/020802AB Curriculum Alignment - MagneBot - NZ.pdf",
		aus: "/projects/magnebot/cads/020802AB Curriculum Alignment - MagneBot - ACARA.pdf",
		cali: "/projects/magnebot/cads/020802AB Curriculum Alignment - MagneBot - California.pdf",
		uk: "/projects/magnebot/cads/020802AB Curriculum Alignment - MagneBot - England.pdf",
	},
	scenePrefix: "Project_RoboticArm",
	durPerLesson: "45 mins",
	numOfLessons: 5,
	difficulty: "introductory",
	subjects: [TECHNOLOGY, ENGINEERING, COMPUTER_SCIENCE, AUTOMATION, MATH, SOCIAL_SCIENCE],
	lessonPlan: "/projects/magnebot/lesson-plan-magnebot.pdf",
	videoId: "3YOLGBQLGjY",
	learnings: [
		"Understand the basics of programming a robotic system.",
		"Convert simple human decisions into an instruction set for a robot.",
		"List examples of how robots can help humans perform everyday tasks.",
		"Use action blocks in the Flow editor.",
		"Explain the purpose of recycling facilities and what we can do to improve their efficiency.",
		"Explain why it is important to only put the correct items in recycling bins.",
	],
	learningOutcomes: [
		"Understand the basics of programming a robotic system.",
		"Convert simple human decisions into an instruction set for a robot.",
		"List examples of how robots can help humans perform everyday tasks.",
		"Use action blocks in the Flow editor.",
		"Explain the purpose of recycling facilities and what we can do to improve their efficiency.",
		"Explain why it is important to only put the correct items in recycling bins.",
	],
	define: {
		threshold: 60,
		md: `Introducing MagneBot, a robotic arm that can move objects with its magnetic sphere attachment! This arm is located in our autonomous recycling facility. Being autonomous means that the entire facility is run by robots: there are no humans present!
    
Unfortunately, a self-driving cart has driven through our recycling facility and spilt bags of rubbish all over the floor! If those bags contain magnetic materials, we might be able to clean up this mess without having to get our own hands dirty...`,
	},
	imagine: {
		threshold: 300,
		modules: [
			{
				type: "pdf",
				title: "Intro to recycling",
				url: "/projects/magnebot/imagine/recycling.pdf",
			},
			{
				type: "pdf",
				title: "Intro to robotics",
				url: "/projects/magnebot/imagine/robotics.pdf",
			},
			{
				type: "tutorial",
				title: "How to MagneBot",
				items: [
					{
						src: "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/projects/magnebot/gifs/tut-1.gif",
						caption: "Use the controls to move the arm and pick up rubbish bags",
					},
					{
						src: "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/projects/magnebot/gifs/tut-2.gif",
						caption: "Get all three rubbish bags into the bins",
					},
					{
						src: "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/projects/magnebot/gifs/tut-3.gif",
						caption: "Hold down and drag with right click to orbit the camera around the arm",
					},
				],
			},
		],
	},
	subsystems: [
		{
			title: "Sequential programming",
			id: "sequential-programming",
			requirements: [],
			img: "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/projects/magnebot/images/sequential.jpg",
			description: "In a single subsystem, your task is to write a sequential program to control MagneBot in order to pick up each rubbish bag and deposit them in one of the two recycling bins.",
			research: {
				threshold: 300,
				caption: ["Work through the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "video",
						title: "Flow tutorial",
						videoId: "2Ndwtpk7iN8",
						description: "Get to know your way around Flow",
					},
					{
						type: "pdf",
						title: "Introduction to Flow blocks",
						url: "/projects/shared/intro-to-flow.pdf",
					},
				],
			},
			plan: {
				threshold: 30,
				list: [
					"Think back to when you were manually controlling the arm... What path did you take to reach the recycling bins? How did you avoid breaking the arm?",
					"As a human, you had to decide which actions to perform in which order to move and control the magnetic sphere. Writing a program is the exact same thing! A program is simply a set of pre-written instructions that tell a robot or other device which action to perform in which order!",
					"In the Create step, you will write a program (a set of instructions) and upload it to MagneBot. The robot will then follow your exact instructions to automatically complete the same task! Unlike you, however, the robot is unable to make decisions on its own. You will need to tell it exactly what do, testing often to find and solve any problems along the way.",
				],
			},
			code: {
				threshold: 600,
				tasks: ["Write some code so that MagneBot can clean up the recycling facility for you", "Deposit three bags of rubbish into either of the two recycling bins to complete the task. Good luck!"],
				hints: [
					"If your arm collides with another object, it will break!",
					"Instead of moving directly from point A to point B, you may need to split that into multiple smaller movements to avoid other obstacles",
				],
			},
			blockList: [
				{
					name: "Actions",
					blocks: [],
				},
			],
		},
	],
	improve: {
		threshold: 300,
		alert:
			"Did you manage to clean up the facility? Uh oh, looks like there's now even more items scattered across the floor! Lucky for us, this time it is after hours! Have fun playing around with MagneBot with no rules to follow or objectives to complete. However, if you want a challenge, try attempting one of the following tasks and see if you can best your classmates.",
		tasks: [
			"How many items can you stack on top of each other? (Our record is five)",
			"Try and throw every object over the edge of the platform",
			"How many items can you place on top of the conveyor belt?",
		],
		hints: [
			"You might need to create some kind of ramp to place items on top of the conveyor belt",
			"Challenge your friends to see who can complete one of the above tasks the best and/or fastest. If you are feeling especially spicy, you could even create your own tasks",
		],
		blockList: [
			{
				name: "Actions",
				blocks: [],
			},
		],
	},
};

export default MAGNEBOT_DATA;
