import Link from "next/link";
import { CONTACING_CREATEBASE, FLOW_CODING, GETTING_STARTED_ON_CREATEBASE, GROUP_ROLES, JOIN_A_SCHOOL, LEARNING_JOURNALS, SECURITY, WHAT_ARE_GROUPS } from "./support-articles";

const SUPPORT_DATA = {
	students: {
		heading: "Student Support",
		icon: "backpack",
		subheading: "Upgrade your game—from zero to hero on CreateBase",
		sections: [
			{
				query: "getting-started-on-createbase",
				heading: "Getting started on CreateBase",
				articles: [
					{
						query: "getting-started-video",
						heading: "Getting started video",
						caption: "Get a quick intro to the CreateBase platform by watching this video",
						tags: ["get started", "introduction", "overview"],
						content: GETTING_STARTED_ON_CREATEBASE.student,
					},
					{
						query: "join-a-school",
						heading: "Join a school",
						caption: "Struggling to join your school? Here's some helpful info",
						tags: ["join my school"],
						content: JOIN_A_SCHOOL.student,
					},
				],
			},
			{
				query: "learning-tools",
				heading: "Learning tools",
				articles: [
					{
						query: "flow-coding",
						heading: "Flow coding",
						caption: "Learn about Flow coding, its benefits, and how it works on CreateBase",
						tags: ["flow code", "blockly", "text", "coding"],
						content: FLOW_CODING.shared,
					},
					{
						query: "learning-journals",
						heading: "Learning journals",
						caption: "Need help with your learning journal? Find it here",
						tags: ["learning journals", "learning"],
						content: LEARNING_JOURNALS.shared,
					},
				],
			},
			{
				query: "my-groups",
				heading: "My groups",
				articles: [
					{
						query: "what-are-groups",
						heading: "What are groups?",
						caption: "Find out how groups work on the CreateBase platform",
						tags: ["groups", "schools", "families"],
						content: WHAT_ARE_GROUPS.student,
					},
					{
						query: "group-roles",
						heading: "Group roles",
						caption: "Learn about the difference between admins, teachers and students",
						tags: ["groups", "admin", "teacher", "student"],
						content: GROUP_ROLES.shared,
					},
				],
			},
			{
				query: "my-account",
				heading: "My account",
				articles: [
					{
						query: "security",
						heading: "Security",
						caption: "Not sure how to reset your password? Learn how here",
						tags: ["reset", "password"],
						content: SECURITY.shared,
					},
				],
			},
			{
				query: "other",
				heading: "Other",
				articles: [
					{
						query: "contacting-createbase",
						heading: "Contacting CreateBase",
						caption: "Find out how to touch base with us!",
						tags: ["contact us", "enquiries"],
						content: CONTACING_CREATEBASE.shared,
					},
				],
			},
		],
	},
	teachers: {
		heading: "Teachers Support",
		icon: "school",
		subheading: "Teachers affect eternity; no one can tell where their influence stops",
		sections: [
			{
				query: "getting-started-on-createbase",
				heading: "Getting started on CreateBase",
				articles: [
					{
						query: "watch---a-brief-intro-for-teachers",
						heading: "Watch - A Brief Intro for Teachers",
						caption: "Lorem ipsum something yada yada",
						tags: ["teachers", "tutorial", "intro", "how to", "video", "getting started"],
						content: [],
					},
					{ query: "our-5-step-creation-process", heading: "Our 5-Step Creation process", caption: "Lorem ipsum something yada yada", tags: ["5", "step", "creation"] },
					{ query: "the-teacher-&-student-experience", heading: "The teacher & student experience", caption: "Lorem ipsum something yada yada", tags: ["teachers", "students", "teaching"] },
					{
						query: "setting-up-your-group",
						heading: "Setting up your group",
						caption: "Lorem ipsum something yada yada",
						tags: ["setting up", "setup", "create group", "new group", "register school", "sign up"],
					},
				],
			},
			{
				query: "your-teaching-tools",
				heading: "Your teaching tools",
				articles: [
					{ query: "lesson-plans", heading: "Lesson plans", caption: "Lorem ipsum something yada yada", tags: ["lesson plans", "lesson guide", "teaching", "example", "cheat sheet", "answers"] },
					{ query: "flow-coding-guide", heading: "Flow coding guide", caption: "Lorem ipsum something yada yada", tags: ["flow code", "coding", "blockly", "guide", "tutorial", "instructions"] },
				],
			},
		],
	},
	admins: {
		heading: "Admins Support",
		icon: "verified_user",
		subheading: "By creators, for creators. CreateBase, at your service",
		sections: [],
	},
};

export default SUPPORT_DATA;
