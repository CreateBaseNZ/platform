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
		url: "https://youtu.be/Byg-XJcJovk",
		src: "/heat-seeker/vid/situation.mp4",
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
					"Your educator will let you know if they want you to answer these questions in your learning journal individually, as a group, or as a class discussion.",
				],
				modules: [
					{
						title: "Define the Problem",
						img: "/heat-seeker/img/define.jpg",
						url: "/heat-seeker/files/define-heat-seeker.pdf",
					},
				],
			},
			research: {
				caption: ["Work through ALL of the modules below to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
				modules: [
					{
						type: "pdf",
						title: "Firefighting",
						url: "/heat-seeker/files/research-01-heat-seeker.pdf",
					},
					{
						type: "pdf",
						title: "Line Following - What is It?",
						url: "/heat-seeker/files/research-02-heat-seeker.pdf",
					},
					{
						type: "pdf",
						title: "Line Following - Our Solution",
						url: "/heat-seeker/files/research-03-heat-seeker.pdf",
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
						title: "Tips & tricks: Sensing & Action blocks",
						url: "/heat-seeker/pdf/sensing-action-blocks.pdf",
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
				tasks: ["Write some code so that your robot can drive forward, following the line until it reaches and puts out the final fire."],
				hints: ["You need to use the outputs from each line sensor to determine when your robot leaves the line and which direction it should turn to get back on it."],
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
						type: "pdf",
						title: "Line Following - Our Improved Solution",
						url: "/heat-seeker/files/research-11-heat-seeker.pdf",
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
				],
			},
			plan: ["TBD"],
			create: {
				caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
				tasks: ["Upgrade your previous solution by adding more code so that your robot can put out any fires in it's path."],
				hints: ["You will need to use a sensor to detect these new fires and activate your water hose.", "Your robot only has a limited amount of water, so make sure that you turn the hose off after you put out each fire."],
			},
			improve: {
				caption: "Test what you’ve learnt by taking on more challenges. There are always ways to make your solution smarter, faster, stronger!",
				alert: "Congratulations! If you managed to put out all of the fires with your robot, then you have successfully completed the Project! You now know how to write a line following algorithm that a robot, like our firefighting bot, can use to automatically navigate through an environment.",
				hints: ["If you want an additional challenge, go back and try to create a solution that uses as few blocks as possible.", "Alternatively, you could continue improving your solution to try and put out all the fires in the smallest possible time."],
			},
		},
	],
};
