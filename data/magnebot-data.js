import { comparisonBoostData, conditionalBoostData, recycleRightData } from "./explore-data";

export default {
	name: "MagneBot",
	query: "magnebot",
	caption:
		"In this project, users will control the MagneBot robotic arm using logical flow-based programming to clean up a recycling facility. Users will learn the basics of the Flow programming language and how to convert their thinking into instructions for the robot. Along the way, they will also gain an understanding of recycling and how robotic systems can be used to carry out tasks traditionally performed by humans.",
	stacked: true,
	scenePrefix: "Project_RoboticArm_1",
	runType: "once",
	nLessons: 0,
	difficulty: "TODO",
	subjects: ["TODO", "TODO2"],
	learningOutcome: "",
	curriculumAlignment: "",
	lessonPlan: "",
	learnings: [""],
	defineCaption: [
		"As a class, dive into group discussions around the Project theme to fully define our problem.",
		"Don't have a teacher to guide you through? Check back soon for individual content!",
	],
	situation: {
		url: "https://youtu.be/iiWiwxxkq2Q",
		src: "/magnebot/vid/situation.mp4",
		h1: "Introducing MagneBot, a robotic arm that can move objects with its magnetic sphere attachment! This arm is located in our autonomous recycling facility. Being autonomous means that the entire facility is run by robots: there are no humans present!",
		h2: "Unfortunately, a self-driving cart has driven through our recycling facility and split bags of rubbish all over the floor! If those bags contain magnetic materials, we might be able to clean up this mess without having to get our own hands dirty...",
		title: "Send It",
	},
	define: [
		{
			title: "Introduction to recycling",
			img: "/magnebot/img/recycling.jpg",
			url: "/magnebot/pdf/recycling.pdf",
		},
		{
			title: "Introduction to robotics",
			img: "/magnebot/img/robotics.png",
			url: "/magnebot/pdf/robotics.pdf",
		},
	],
	researchCaption: ["Work through the four modules above to complete your research.", "Make sure that you understand all of the content as you will need it to create your solution!"],
	research: [
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
			type: "tut",
			title: "How to MagneBot",
			items: [
				{
					src: "/magnebot/vid/tut-1.mp4",
					subtitle: <p>Use the controls to move the arm and pick up rubbish bags</p>,
				},
				{
					src: "/magnebot/vid/tut-2.mp4",
					subtitle: <p>Get all three rubbish bags into the bins</p>,
				},
				{
					src: "/magnebot/vid/tut-3.mp4",
					subtitle: <p>Hold down and drag with right click to orbit the camera around the arm</p>,
				},
			],
		},
		{
			type: "explore",
			title: "Explore more",
			items: [recycleRightData],
		},
	],
	plan: [
		"Think back to when you were manually controlling the arm... What path did you take to reach the recycling bins? How did you avoid breaking the arm?",
		"As a human, you had to decide which actions to perform in which order to move and control the magnetic sphere. Writing a program is the exact same thing! A program is simply a set of pre-written instructions that tell a robot or other device which action to perform in which order!",
		"In the Create step, you will write a program (a set of instructions) and upload it to MagneBot. The robot will then follow your exact instructions to automatically complete the same task! Unlike you, however, the robot is unable to make decisions on its own. You will need to tell it exactly what do, testing often to find and solve any problems along the way.",
	],
	create: {
		caption: "This step is all about building your own code, making sure you test as you go. Rinse and repeat. Be sure to share it with your friends!",
		tasks: ["Write some code so that MagneBot can clean up the recycling facility for you", "Deposit three bags of rubbish into either of the two recycling bins to complete the task. Good luck!"],
		hints: ["Write some code so that MagneBot can clean up the recycling facility for you", "Deposit three bags of rubbish into either of the two recycling bins to complete the task"],
	},
	improve: {
		caption: "Test what you’ve learnt by taking on more challenges. There are always ways to make your solution smarter, faster, stronger!",
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
	},
};
