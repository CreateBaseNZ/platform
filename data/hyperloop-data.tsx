import { COMPUTER_SCIENCE, ENGINEERING, TECHNOLOGY, JAVASCRIPT } from "../constants/projectSubjects";
import { TProject } from "../types/projects";

// TODO - @brad update the hyperloop thumbnail (needs to look good at minimum 1920px width)

const HYPERLOOP_DATA: TProject = {
	id: "hyperloop",
	title: "Hyperloop",
	// TODO - give this a proper subtitle
	subtitle: "Get hyped",
	description:
		"Chaos! Passengers arriving at a hyperloop terminal need to have their passenger numbers matched up to the correct capsule, but the computer system has malfunctioned! Students will learn how to convert between different number systems before implementing an algorithm to automate this process. Hyperloop capsules and passengers will display their identification numbers in variety of number systems, including binary, trinary, decimal, and hexadecimal. Note that students are expected to have had some minor experience with text coding before attempting this Project.",
	textCodingOnly: true,
	scenePrefix: "Project_Hyperloop",
	runType: "loop",
	durPerLesson: "45 mins",
	numOfLessons: 5,
	difficulty: "proficient",
	subjects: [TECHNOLOGY, ENGINEERING, COMPUTER_SCIENCE, JAVASCRIPT],
	videoId: "K6KXIWtlVH8",
	cads: {
		nz: "/projects/hyperloop/cads/020802AF Curriculum Alignment - Hyperloop - NZ.pdf",
		aus: "/projects/hyperloop/cads/020802AF Curriculum Alignment - Hyperloop - ACARA.pdf",
		cali: "/projects/hyperloop/cads/020802AF Curriculum Alignment - Hyperloop - California.pdf",
		uk: "/projects/hyperloop/cads/020802AF Curriculum Alignment - Hyperloop - England.pdf",
	},
	// TODO - @brydon hyperloop lesson plan missing
	lessonPlan: "/aimbot/files/210505AD_EarlyAccess.pdf",
	learnings: [
		"Convert a binary number to a decimal number.",
		"Convert a decimal number to a binary number.",
		"Convert any base number system to any other base number system by using base 10 as an intermediary conversion.",
		"Revise how to create and call functions using JavaScript.",
	],
	learningOutcomes: [
		"Convert a binary number to a decimal number.",
		"Convert a decimal number to a binary number.",
		"Convert any base number system to any other base number system by using base 10 as an intermediary conversion.",
		"Revise how to create and call functions using JavaScript.",
	],
	define: {
		threshold: 30,
		md: `Dive into the situation by watching this short video.

Your first step to begin solving this problem is to download either of the learning journals below, saving a copy for yourself. Your learning journal will guide you through the Project and serves as a place to document your progress.`,
	},
	imagine: {
		threshold: 30,
		modules: [
			{
				type: "pdf",
				title: "What is a number system?",
				url: "/projects/hyperloop/imagine/210701AB Imagine - 1.pdf",
			},
			{
				type: "pdf",
				title: "Robot capabilities: ticket master",
				url: "/projects/hyperloop/imagine/210701AB Imagine - 2.pdf",
			},
			{
				type: "playtest",
				title: "Playtest Hyperloop",
			},
		],
	},
	subsystems: [
		{
			title: "Binary to hexadecimal",
			id: "binary-to-hexadecimal",
			requirements: [],
			img: "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/projects/hyperloop/images/subsystem-1.jpg",
			description:
				"In this subsystem, we will create a simple JavaScript program that maps binary numbers to the equivalent hexadecimal number. This will allow our robot to perform hardcoded number conversions using a series of IF statements, but is it the most efficient?",
			research: {
				threshold: 30,
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to code your solution!"],
				modules: [
					{
						type: "pdf",
						title: "How to Hyperloop",
						url: "/projects/hyperloop/subsystems/210701AD How to Hyperloop.pdf",
					},
				],
			},
			plan: {
				threshold: 30,
				list: [
					"In this first subsystem, our aim is to create a direct mapping between two different number systems.",
					"To do this, we need to make a plan. Open up your learning journal and answer all of the questions in the Plan section for subsystem 1. If you get stuck, your educator may let you ask your classmates for help, but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 60,
				tasks: [
					"Passengers will be queueing up and need to be allocated one at a time to the correct Hyperloop capsule.",
					"You will need to create a program that detects the passenger's number, converts it to the correct hyperloop number, and then calls the MovePersonToHyperloop() function with the correct hyperloop number.",
				],
				hints: [
					"Your code will automatically run once for each new passenger.",
					"Make sure that you know how to map between binary and hexadecimal.",
					"The largest possible passenger number is 1111 so you don't need to add mappings for any numbers higher than this.",
				],
			},
			blockList: [],
			position: {
				x: 0,
				y: 0,
			},
		},
		{
			title: "Binary to decimal",
			id: "binary-to-decimal",
			requirements: ["Binary to hexadecimal"],
			img: "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/projects/hyperloop/images/subsystem-2.jpg",
			description:
				"In this subsystem, we will create a more advanced JavaScript program that uses an algorithm to convert any binary number to the equivalent decimal number. This approach is much more scalable than hard-coding number conversions.",
			research: {
				threshold: 60,
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to code your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Binary to decimal",
						url: "/projects/hyperloop/subsystems/210701AC Research - 2.pdf",
					},
				],
			},
			plan: {
				threshold: 30,
				list: [
					"In this second subsystem, our aim is to create a program that implements the algorithm that we outlined in the research step.",
					"To do this, we will start with a basic framework for the code. Open up your learning journal and answer all of the questions in the Plan section for subsystem 2. If you get stuck, your educator may let you ask your classmates for help, but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 300,
				tasks: [
					"Passengers will be queueing up and need to be allocated one at a time to the correct Hyperloop capsule.",
					"You will need to create a program that detects the passenger's number, converts it to the correct hyperloop number, and then calls the MovePersonToHyperloop() function with the correct hyperloop number.",
				],
				hints: [
					"Your code will automatically run once for each new passenger.",
					"Make sure that you know how to map between binary and decimal using an algorithm.",
					"Don't forget about JavaScript syntax, including how to index arrays.",
				],
			},
			blockList: [],
			position: {
				x: 0,
				y: 0,
			},
		},
		{
			title: "Decimal to binary",
			id: "decimal-to-binary",
			requirements: ["Binary to hexadecimal"],
			img: "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/projects/hyperloop/images/subsystem-3.jpg",
			description:
				"Let's try the reverse of subsystem 2 and create a JavaScript program that uses an algorithm to convert a decimal number to the equivalent binary number. We will generalize our answer to be able to convert to any base between 2 and 10.",
			research: {
				threshold: 60,
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to code your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Decimal to Binary",
						url: "/projects/hyperloop/subsystems/210701AC Research - 3.pdf",
					},
				],
			},
			plan: {
				threshold: 30,
				list: [
					"In this third subsystem, our aim is to create a program that implements the algorithm that we outlined in the research step. We will start with a basic framework for the code. ",
					"Open up your learning journal and answer all of the questions in the Plan section for subsystem 3. If you get stuck, your educator may let you ask your classmates for help, but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 300,
				tasks: [
					"Passengers will be queueing up and need to be allocated one at a time to the correct Hyperloop capsule.",
					"You will need to create a program that detects the passenger's number, converts it to the correct hyperloop number, and then calls the MovePersonToHyperloop() function with the correct hyperloop number.",
				],
				hints: [
					"Your code will automatically run once for each new passenger.",
					"Make sure that you know how to map between decimal and binary using an algorithm.",
					"Don't forget about JavaScript syntax, including how to index arrays.",
				],
			},
			blockList: [],
			position: {
				x: 0,
				y: 0,
			},
		},
		{
			title: "Ternary to tridecimal",
			id: "ternary-to-tridecimal",
			requirements: ["Binary to decimal", "Decimal to binary"],
			img: "https://raw.githubusercontent.com/CreateBaseNZ/public/dev/projects/hyperloop/images/subsystem-4.jpg",
			description: "In this subsystem, we will combine everything we have learnt to far to create a JavaScript program that uses an algorithm to convert between base 3 and base 13.",
			research: {
				threshold: 60,
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to code your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Converting between any two bases",
						url: "/projects/hyperloop/subsystems/210701AC Research - 4.pdf",
					},
				],
			},
			plan: {
				threshold: 30,
				list: [
					"In this fourth and final subsystem, our aim is to create a program that implements the algorithm that we outlined in the research step. We will start with a more advanced framework for the code. ",
					"Open up your learning journal and answer all of the questions in the Plan section for subsystem 4. If you get stuck, your educator may let you ask your classmates for help, but don't forget to explain your own reasoning!",
				],
			},
			code: {
				threshold: 300,
				tasks: [
					"Passengers will be queueing up and need to be allocated one at a time to the correct Hyperloop capsule.",
					"You will need to create a program that detects the passenger's number, converts it to the correct hyperloop number, and then calls the MovePersonToHyperloop() function with the correct hyperloop number.",
				],
				hints: [
					"Your code will automatically run once for each new passenger.",
					"Make sure that you know how to map between any base to decimal and then to any other base using an algorithm.",
					"Don't forget about JavaScript syntax, including how to index arrays.",
				],
			},
			blockList: [],
			position: {
				x: 0,
				y: 0,
			},
		},
	],
	improve: {
		threshold: 60,
		alert:
			"Congratulations! You should now have a good understanding about how to convert between two static number systems. But, what if the number systems that you were converting between weren't always the same?",
		tasks: [
			"Each passenger will arrive with a randomised number form a randomised base.",
			"In addition to passenger number systems changing, the number systems used by the hyperloop capsules will also randomly change each time a new passenger arrives! Absolute chaos!",
			"Modify your code from subsystem 4 so that it can handle this randomisation.",
		],
		hints: [
			"The robot already has access to three variables: personNumber, personBase and hyperloopBase.",
			"personBase contains the value of the base of the next passenger.",
			"hyperloopBase contains the value of the base of the hyperloop capsules.",
			"If your solution for subsystem 4 is robust enough, the only thing that you will need to change is your inputs to MovePersonToHyperloop()",
		],
		blockList: [],
	},
};

export default HYPERLOOP_DATA;
