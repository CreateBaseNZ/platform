import {
	ADDING_STUDENTS,
	CONTACTING_CREATEBASE,
	CREATE_A_CLASS,
	FLOW_CODING,
	GETTING_STARTED_ON_CREATEBASE,
	GROUP_ROLES,
	JOIN_A_SCHOOL,
	LEARNING_JOURNALS,
	LESSON_PLANS,
	MANAGE_USERS_IN_YOUR_SCHOOL,
	RECOVER_STUDENT_PASSWORDS,
	REGISTER_A_SCHOOL,
	REGISTER_OR_JOIN_YOUR_SCHOOL,
	SECURITY,
	STEP_1_DEFINE,
	STEP_2_IMAGINE,
	STEP_3_THE_CREATE_LOOP,
	STEP_4_IMPROVE,
	STEP_5_REVIEW,
	STUDENT_TRACKING,
	THE_5_STEP_CREATION_PROCESS,
	WHAT_ARE_GROUPS,
} from "./support-articles";

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
						content: CONTACTING_CREATEBASE.shared,
					},
				],
			},
		],
	},
	teachers: {
		heading: "Teacher Support",
		icon: "school",
		subheading: "Find all the support you need to use the CreateBase platform in your classroom.",
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
						content: GETTING_STARTED_ON_CREATEBASE.teacher,
					},
					{
						query: "the-5-step-creation-process",
						heading: "The 5-Step Creation Process",
						caption: "Read about the problem-solving process intertwined into every CreateBase Project",
						tags: ["5 step creation process", "lesson plans", "projects", "learning journal"],
						content: THE_5_STEP_CREATION_PROCESS.staff,
					},
					{
						query: "register-a-school",
						heading: "Register a school",
						caption: "Learn how to add your school to our platform",
						tags: ["register", "my groups"],
						content: REGISTER_A_SCHOOL.staff,
					},
					{
						query: "join-a-school",
						heading: "Join a school",
						caption: "Learn how to join your school if it already exists on our platform",
						tags: ["join my school"],
						content: JOIN_A_SCHOOL.teacher,
					},
					{
						query: "create-a-class",
						heading: "Create a class",
						caption: "Find out how to prepare to teach by setting up your class",
						tags: ["create my class"],
						content: CREATE_A_CLASS.staff,
					},
				],
			},
			{
				query: "the-5-step-creation-process",
				heading: "The 5 Step Creation Process",
				articles: [
					{
						query: "intro-to-the-5-step-creation-process",
						heading: "Intro to the 5 Step Creation Process",
						caption: "Read about the problem-solving process intertwined into every CreateBase Project",
						tags: ["5 step creation process", "lesson plans", "projects", "learning journal"],
						content: THE_5_STEP_CREATION_PROCESS.staff,
					},
					{
						query: "step-1-define",
						heading: "Step 1: Define",
						caption: "Read about the Define step, why we use it and how it works on our platform",
						tags: ["5 step creation process", "define"],
						content: STEP_1_DEFINE.staff,
					},
					{
						query: "step-2-imagine",
						heading: "Step 2: Imagine",
						caption: "Read about the Imagine step, why we use it and how it works on our platform",
						tags: ["5 step creation process", "imagine"],
						content: STEP_2_IMAGINE.staff,
					},
					{
						query: "step-3-the-create-loop",
						heading: "Step 3: The Create loop",
						caption: "Read about the Create loop, why we use it and how it works on our platform",
						tags: ["5 step creation process", "create loop", "research", "plan", "code"],
						content: STEP_3_THE_CREATE_LOOP.staff,
					},
					{
						query: "step-4-improve",
						heading: "Step 4: Improve",
						caption: "Read about the Improve step, why we use it and how it works on our platform",
						tags: ["5 step creation process", "improve"],
						content: STEP_4_IMPROVE.staff,
					},
					{
						query: "step-5-review",
						heading: "Step 5: Review",
						caption: "Read about the Review step, why we use it and how it works on our platform",
						tags: ["5 step creation process", "review", "share", "reflect"],
						content: STEP_5_REVIEW.staff,
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
						caption: "Interested in how students show their work? Learn about learning journals below",
						tags: ["learning journals", "learning"],
						content: LEARNING_JOURNALS.shared,
					},
				],
			},
			{
				query: "teaching-tools",
				heading: "Teaching tools",
				articles: [
					{
						query: "lesson-plans",
						heading: "Lesson plans",
						caption: "Find out how lesson plans work on the CreateBase platform",
						tags: ["lesson plans", "teaching", "answers", "curriculum", "5 step creation process", "learning outcomes", "resources"],
						content: LESSON_PLANS.staff,
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
						content: WHAT_ARE_GROUPS.staff,
					},
					{
						query: "group-roles",
						heading: "Group roles",
						caption: "Learn about the difference between admins, teachers, and students",
						tags: ["groups", "admin", "teacher", "student", "roles"],
						content: GROUP_ROLES.shared,
					},
					{
						query: "register-or-join-your-school",
						heading: "Register or join your school",
						caption: "Need to register or join a school? Learn how here",
						tags: ["register", "join group", "school"],
						content: REGISTER_OR_JOIN_YOUR_SCHOOL.staff,
					},
					{
						query: "adding-students",
						heading: "Adding students",
						caption: "Learn how to add students to your group",
						tags: ["add students", "group"],
						content: ADDING_STUDENTS.staff,
					},
					{
						query: "manage-users-in-your-school",
						heading: "Manage users in your school",
						caption: "Find out how what controls you have over groups you are an admin of",
						tags: ["manage", "remove", "promote", "admin", "teacher", "student"],
						content: MANAGE_USERS_IN_YOUR_SCHOOL.staff,
					},
					{
						query: "recover-student-passwords",
						heading: "Recover student passwords",
						caption: "Learn how to reset students passwords",
						tags: ["passwords", "reset", "lost password", "student"],
						content: RECOVER_STUDENT_PASSWORDS.staff,
					},
				],
			},
			{
				query: "manage-my-class",
				heading: "Manage my class",
				articles: [
					{
						query: "create-a-class",
						heading: "Create a class",
						caption: "Classes are needed to teach and track students—find out how to make classes here",
						tags: ["class", "setup", "new class"],
						content: CREATE_A_CLASS.staff,
					},
					{
						query: "student-tracking",
						heading: "Student tracking",
						caption: "Learn how to track your students as they complete projects",
						tags: ["tracking", "data", "engagement"],
						content: STUDENT_TRACKING.staff,
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
						content: CONTACTING_CREATEBASE.shared,
					},
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
