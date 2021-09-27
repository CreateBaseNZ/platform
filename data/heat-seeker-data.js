import { ifBoostData, whileBoostData } from "./explore-data";

export default {
	name: "Heat Seeker",
	query: "heat-seeker",
	caption:
		"In this Project, learners will create an algorithm to guide a line-following robot to a series of fires within a warehouse, putting them out safely before they spread to nearby hydrogen fuel cells! Learners will not only create their own control-algorithm, but will also learn about some of the basics of fire safety, warehouse automation, and the advantage that robots have over humans when operating in hazardous situations.",
	stacked: true,
	scenePrefix: "Project_HeatSeeker_1",
	runType: "loop",
	durPerLesson: "45 mins",
	numOfLessons: 6,
	difficulty: "Advanced",
	subjects: ["Technology", "Engineering", "Computer Science", "Fire Safety"],
	learningOutcome: "TBD",
	curriculumAlignment: "TBD",
	lessonPlan: "TBD",
	learnings: ["TBD"],
	situation: {
		url: "",
		src: "",
		h1: "TBD",
		h2: "TBD",
		title: "Heat Seeker",
		docs: "",
		word: "",
	},
	iterations: [
		{
			define: {
				caption: [
					"As a class, dive into group discussions around the Project theme to fully define our problem.",
					"Don't have a teacher to guide you through? Check back soon for individual content!",
				],
				modules: [
					{
						title: "TBD",
						img: "",
						url: "",
					},
					{
						title: "TBD",
						img: "",
						url: "",
					},
				],
			},
			research: {
				caption: ["Work through the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
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
						type: "explore",
						title: "Explore more",
						items: [ifBoostData, whileBoostData],
					},
				],
			},
			plan: ["TBD"],
			create: {
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["TBD"],
				hints: ["TBD"],
			},
			improve: {
				caption: "Test what you’ve learnt by taking on more challenges. There are always ways to make your solution smarter, faster, stronger!",
				alert: "TBD",
				tasks: ["TBD"],
				hints: ["TBD"],
			},
		},
		{
			define: {
				caption: [
					"As a class, dive into group discussions around the Project theme to fully define our problem.",
					"Don't have a teacher to guide you through? Check back soon for individual content!",
				],
				modules: [
					{
						title: "TBD",
						img: "",
						url: "",
					},
					{
						title: "TBD",
						img: "",
						url: "",
					},
				],
			},
			research: {
				caption: ["Work through the four modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
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
				],
			},
			plan: ["TBD"],
			create: {
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["TBD"],
				hints: ["TBD"],
			},
			improve: {
				caption: "Test what you’ve learnt by taking on more challenges. There are always ways to make your solution smarter, faster, stronger!",
				alert: "TBD",
				tasks: ["TBD"],
				hints: ["TBD"],
			},
		},
	],
};
