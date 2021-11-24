import Link from "next/link";

const SUPPORT_DATA = {
	students: {
		heading: "Students Support",
		icon: "backpack",
		subheading: "Upgrade your game — from zero to hero on CreateBase",
		sections: [
			{
				query: "getting-started-on-createbase",
				heading: "Getting started on CreateBase",
				articles: [
					{
						query: "watch---a-brief-intro-for-students",
						heading: "Watch - A Brief Intro for Students",
						caption: "Lorem ipsum something yada yada",
						tags: ["students", "tutorial", "intro", "how to", "video", "getting started"],
					},
					{
						query: "student-faqs",
						heading: "Student FAQs",
						caption: "Lorem ipsum something yada yada",
						tags: ["students", "faq", "frequently asked questions"],
						content: (
							<>
								<h2>How do I make a cool unordered list?</h2>
								<ul>
									<li>Write a list</li>
									<li>Be cool</li>
								</ul>
								<h2>How do I make a cool ordered list?</h2>
								<ol>
									<li>Very nice</li>
									<li>Very cool</li>
									<li>Very ordered</li>
								</ol>
								<p>
									Write a very boring paragraph that's very long, but not super long to make it ugly. Just long enough to wrap around so I can see what it looks like styling-wise. Include some{" "}
									<b>boldness</b>, sprinkle it <b>here</b> and <b>again here</b> as well.
								</p>
								<h2>What about links?</h2>
								<p>
									Links will look like this <Link href="/">don't click me</Link>.
								</p>
								<p>Here's a paragraph following another.</p>
								<h2>How about subheadings</h2>
								<h3>They will look like this</h3>
								<p>Subheadings are great when you want to cover multiple related but categorised topics under one general heading.</p>
								<h3>Another example</h3>
								<p>Like here again.</p>
								<h2>How do I embed videos?</h2>
								<iframe
									src="https://www.youtube.com/embed/dmShaNP-rt8"
									title="YouTube video player"
									className="embedded-video-16-9"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								/>
								<h2>What about images?</h2>
								<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/support-6.jpg" />
							</>
						),
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
