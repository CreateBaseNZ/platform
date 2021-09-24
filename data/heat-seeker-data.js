import { conditionalBoostData } from "./explore-data";

export default {
	name: "Heat Seeker",
	query: "heat-seeker",
	caption: "TBD",
	stacked: true,
	scenePrefix: "Project_HeatSeeker_1",
	runType: "loop",
	durPerLesson: "TBD",
	numOfLessons: "TBD",
	difficulty: "Advanced",
	subjects: ["TBD"],
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
					{
						type: "explore",
						title: "Explore more",
						items: [conditionalBoostData],
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
