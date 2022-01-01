import { COMPUTER_SCIENCE, ENGINEERING, TECHNOLOGY } from "../constants/projectSubjects";
import { IProjectReadOnly } from "../types/types";

const HYPERLOOP_DATA: IProjectReadOnly = {
	name: "Hyperloop",
	query: "hyperloop",
	caption:
		"Students will be creating a hyperloop controller where they will control the output track that the starting track is connected to. The people using the hyperloop cars will display which output they want to go in a number system of binary, octal, decimal, or hexadecimal in a text box. This will then need to be converted to another number system which will tell a robot in a booth which buttons to press to turn the connecting track to the correct output. The purpose of this project is to understand how different number base systems work.",
	stacked: true,
	noFlow: true,
	scenePrefix: "Project_Hyperloop",
	runType: "loop",
	durPerLesson: "45 mins",
	numOfLessons: 8,
	difficulty: "advanced",
	subjects: [TECHNOLOGY, ENGINEERING, COMPUTER_SCIENCE],
	learningOutcome: "/hyperloop/files/project-overview.pdf",
	cads: {
		nz: "/send-it/cads/020802AC Curriculum Alignment - Send It - NZ.pdf",
		aus: "/send-it/cads/020802AC Curriculum Alignment - Send It - ACARA.pdf",
		cali: "/send-it/cads/020802AC Curriculum Alignment - Send It - California.pdf",
		uk: "/send-it/cads/020802AC Curriculum Alignment - Send It - England.pdf",
	}, // TODO
	lessonPlan: "/hyperloop/files/lesson-plan-hyperloop.pdf",
	learnings: [
		"Convert a binary number to a decimal number.",
		"Convert a decimal number to a binary number",
		"Convert any base number system to any other base number system by using base 10 as an intermediary conversion.",
	],
	define: {
		threshold: 30,
		url: "https://youtu.be/UvZtYfMDLDI",
		src: "/hyperloop/vid/situation.mp4",
		h1: "Dive into the situation by watching this short video.",
		h2: "Your first step to begin solving this problem is to download either of the learning journals below, saving a copy for yourself. Your learning journal will guide you through the Project and serves as a place to document your progress.",
		title: "Hyperloop",
		docs: "https://docs.google.com/document/d/1MZ43lDVs1unrV7QQJW2YzQmc0WnzNZ2wJ7JGzD3GLaU/edit",
		word: "https://docs.google.com/document/d/1MZ43lDVs1unrV7QQJW2YzQmc0WnzNZ2wJ7JGzD3GLaU/edit",
	},
	imagine: {
		threshold: 30,
		caption: [
			"As a class, dive into group discussions around the Project theme to fully define our problem.",
			"Your educator will let you know if they want you to answer these questions in your learning journal individually, as a group, or as a class discussion.",
		],
		modules: [
			{
				type: "pdf",
				title: "Imagine...",
				img: "/hyperloop/img/define.jpg",
				url: "/hyperloop/files/12050102AB-imagine_page1.pdf",
			},
			{
				type: "pdf",
				title: "Define Our Solution",
				img: "/hyperloop/img/define.jpg",
				url: "/hyperloop/files/12050102AB-imagine_page2.pdf",
			},
		],
	},
	subsystems: [
		{
			title: "Subsystem 1",
			requirements: [],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/aimbot/img/thumbnail.png", // TODO
			description:
				"In this subsystem, we will restrict the movement of the mosquito and our arm to a single dimension. We will need to use sensor data to calculate where we should aim, move our arm to that position, and then activate the laser!",
			research: {
				threshold: 30,
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
			plan: {
				threshold: 30,
				list: [
					"In this first subsystem, our aim is to understand how to calculate how far we need to move our arm to aim at the next mosquito. We will then perform a movement before firing the laser at the mosquito.",
					"To do this, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section for subsystem 1. If you get stuck, your educator may let you ask your classmates for help, but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 30,
				tasks: [
					"Mosquitos will be appearing across your screen in a horizontal line.",
					"You need to find the position of each mosquito, aim your robot by controlling its yaw angle, and then fire to destroy all of the mosquitos.",
					"If you aim too slowly, the mosquitos will disappear! Make sure that you turn your robot quickly.",
				],
				hints: [
					"You will need to use the x coordinate of the mosquitos to calculate the angle that you need to aim at using trigonometry.",
					"You can aim by controlling the velocity of the motors in the robot's arm.",
					"Too avoid overshooting your target, you may want to have a dynamic velocity where you slow down your speed as you get close to your target.",
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it in future steps.",
				],
			},
			blockList: [],
		},
		{
			title: "Subsystem 2",
			requirements: [],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/aimbot/img/thumbnail.png", // TODO
			description:
				"In this subsystem, we will restrict the movement of the mosquito and our arm to a single dimension. We will need to use sensor data to calculate where we should aim, move our arm to that position, and then activate the laser!",
			research: {
				threshold: 0, // TODO
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
			plan: {
				threshold: 0, // TODO
				list: [
					"In this first subsystem, our aim is to understand how to calculate how far we need to move our arm to aim at the next mosquito. We will then perform a movement before firing the laser at the mosquito.",
					"To do this, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section for subsystem 1. If you get stuck, your educator may let you ask your classmates for help, but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 0, // TODO
				tasks: [
					"Mosquitos will be appearing across your screen in a horizontal line.",
					"You need to find the position of each mosquito, aim your robot by controlling its yaw angle, and then fire to destroy all of the mosquitos.",
					"If you aim too slowly, the mosquitos will disappear! Make sure that you turn your robot quickly.",
				],
				hints: [
					"You will need to use the x coordinate of the mosquitos to calculate the angle that you need to aim at using trigonometry.",
					"You can aim by controlling the velocity of the motors in the robot's arm.",
					"Too avoid overshooting your target, you may want to have a dynamic velocity where you slow down your speed as you get close to your target.",
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it in future steps.",
				],
			},
			blockList: [],
		},
		{
			title: "Subsystem 3",
			requirements: [],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/aimbot/img/thumbnail.png", // TODO
			description:
				"In this subsystem, we will restrict the movement of the mosquito and our arm to a single dimension. We will need to use sensor data to calculate where we should aim, move our arm to that position, and then activate the laser!",
			research: {
				threshold: 0, // READONLY
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
			plan: {
				threshold: 0, // TODO
				list: [
					"In this first subsystem, our aim is to understand how to calculate how far we need to move our arm to aim at the next mosquito. We will then perform a movement before firing the laser at the mosquito.",
					"To do this, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section for subsystem 1. If you get stuck, your educator may let you ask your classmates for help, but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 0, // TODO
				tasks: [
					"Mosquitos will be appearing across your screen in a horizontal line.",
					"You need to find the position of each mosquito, aim your robot by controlling its yaw angle, and then fire to destroy all of the mosquitos.",
					"If you aim too slowly, the mosquitos will disappear! Make sure that you turn your robot quickly.",
				],
				hints: [
					"You will need to use the x coordinate of the mosquitos to calculate the angle that you need to aim at using trigonometry.",
					"You can aim by controlling the velocity of the motors in the robot's arm.",
					"Too avoid overshooting your target, you may want to have a dynamic velocity where you slow down your speed as you get close to your target.",
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it in future steps.",
				],
			},
			blockList: [],
		},
		{
			title: "Subsystem 4",
			requirements: [],
			imgSrc: "https://raw.githubusercontent.com/CreateBaseNZ/public/main/aimbot/img/thumbnail.png", // TODO
			description:
				"In this subsystem, we will restrict the movement of the mosquito and our arm to a single dimension. We will need to use sensor data to calculate where we should aim, move our arm to that position, and then activate the laser!",
			research: {
				threshold: 0, // READONLY
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
			plan: {
				threshold: 0, // TODO
				list: [
					"In this first subsystem, our aim is to understand how to calculate how far we need to move our arm to aim at the next mosquito. We will then perform a movement before firing the laser at the mosquito.",
					"To do this, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section for subsystem 1. If you get stuck, your educator may let you ask your classmates for help, but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 0, // TODO
				tasks: [
					"Mosquitos will be appearing across your screen in a horizontal line.",
					"You need to find the position of each mosquito, aim your robot by controlling its yaw angle, and then fire to destroy all of the mosquitos.",
					"If you aim too slowly, the mosquitos will disappear! Make sure that you turn your robot quickly.",
				],
				hints: [
					"You will need to use the x coordinate of the mosquitos to calculate the angle that you need to aim at using trigonometry.",
					"You can aim by controlling the velocity of the motors in the robot's arm.",
					"Too avoid overshooting your target, you may want to have a dynamic velocity where you slow down your speed as you get close to your target.",
					"Click the save button in the bottom left menu when you have finished writing your code so that you can access it in future steps.",
				],
			},
			blockList: [],
		},
	],
	improve: {
		threshold: 0, // TODO
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
		blockList: [],
	},
};

export default HYPERLOOP_DATA;
