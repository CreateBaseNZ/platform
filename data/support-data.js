import Link from "next/link";

const SUPPORT_DATA = {
	students: {
		heading: "Students Support",
		icon: "backpack",
		subheading: "Upgrade your game — from zero to hero on CreateBase",
		sections: [
			{
				query: "getting-started-with-createbase",
				heading: "Getting started with CreateBase",
				articles: [
					{
						query: "getting-started-video",
						heading: "Getting Started video",
						caption: "Get a quick intro to the CreateBase platform by watching this video",
						tags: ["get started", "introduction", "overview"],
						content: (
							<>
								<p>This Getting Started video explains the basics you need to know to get started with us. So have a watch and get started on your journey on the CreateBase platform.</p>
								<p>This is the same as your onboarding video, so if you can remember that no need to rewatch it.</p>
							</>
						),
					},
					{
						query: "join-a-school",
						heading: "Join a school",
						caption: "Struggling to join your school? Here's some helpful info",
						tags: ["join my school"],
						content: (
							<>
								<p>To join your school, click join school and enter the code given to you by your teacher.</p>
							</>
						),
					},
					// {
					// 	query: "student-faqs",
					// 	heading: "Student FAQs",
					// 	caption: "Lorem ipsum something yada yada",
					// 	tags: ["students", "faq", "frequently asked questions"],
					// 	content: (
					// 		<>
					// 			<h2>How do I make a cool unordered list?</h2>
					// 			<ul>
					// 				<li>Write a list</li>
					// 				<li>Be cool</li>
					// 			</ul>
					// 			<h2>How do I make a cool ordered list?</h2>
					// 			<ol>
					// 				<li>Very nice</li>
					// 				<li>Very cool</li>
					// 				<li>Very ordered</li>
					// 			</ol>
					// 			<p>
					// 				Write a very boring paragraph that's very long, but not super long to make it ugly. Just long enough to wrap around so I can see what it looks like styling-wise. Include some{" "}
					// 				<b>boldness</b>, sprinkle it <b>here</b> and <b>again here</b> as well.
					// 			</p>
					// 			<h2>What about links?</h2>
					// 			<p>
					// 				Links will look like this <Link href="/">don't click me</Link>.
					// 			</p>
					// 			<p>Here's a paragraph following another.</p>
					// 			<h2>How about subheadings</h2>
					// 			<h3>They will look like this</h3>
					// 			<p>Subheadings are great when you want to cover multiple related but categorised topics under one general heading.</p>
					// 			<h3>Another example</h3>
					// 			<p>Like here again.</p>
					// 			<h2>How do I embed videos?</h2>
					// 			<iframe
					// 				src="https://www.youtube.com/embed/dmShaNP-rt8"
					// 				title="YouTube video player"
					// 				className="embedded-video-16-9"
					// 				frameBorder="0"
					// 				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					// 				allowFullScreen
					// 			/>
					// 			<h2>What about images?</h2>
					// 			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/support-6.jpg" />
					// 		</>
					// 	),
					// },
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
						content: (
							<>
								<p>The CreateBase Platform uses a visual coding language called Flow. Flow code is not a new concept, and has huge benefits for beginner coders.</p>
								<p>To introduce what Flow is we need to explain 2 types of coding languages. Imperative and Functional.</p>
								<p>
									To do this we’ll show how code is written and the difference in how data travels through code <b>"nodes"</b> in a program developed in these 2 languages.
								</p>
								<div style={{ display: "flex", width: "100%", margin: "2rem 0" }}>
									<div style={{ display: "flex", flexDirection: "column", padding: "0.5rem 1.5rem 1rem 1.5rem", borderRadius: "12px", backgroundColor: "#f8f8f8", margin: "0 1.5rem" }}>
										<h3>Imperative</h3>
										<p>
											Code is written linearly, from top to bottm. In order of <b>node</b> 1 ➔ 2 ➔ 3 ➔ 4 ➔ 5
										</p>
										<p>
											Code runs in a non-linear way. Continuously modifing the <b>state</b> of the code.
										</p>
									</div>
									<div style={{ display: "flex", flexDirection: "column", padding: "0.5rem 1.5rem 1rem 1.5rem", borderRadius: "12px", backgroundColor: "#f8f8f8", margin: "0 1.5rem" }}>
										<h3>Functional</h3>
										<p>
											Code is written linearly from start to finish, In order of <b>node</b> 1 ➔ 2 ➔ 3 ➔ 4 ➔ 5
										</p>
										<p>
											Code runs exactly how it was written! No need for complex <b>state</b> changes
										</p>
									</div>
								</div>
								<h2>Why use Flow Coding?</h2>
								<p>
									Firstly, why do we use a <b>visual language</b>?
								</p>
								<p>Visual languages have 3 key benefits:</p>
								<ol>
									<li>
										<b>Readability</b>—it is easy to read existing code and understand what it does when alid out visually.
									</li>
									<li>
										<b>Ease of use</b>—it is quick and easy to get started writing code using the langauge as there is far less syntax and complicated logic to memorise.
									</li>
									<li>
										<b>De-bugging</b>—visual code is easier to debug for beginners with its visual representation and constrained syntax.
									</li>
								</ol>
								<p>
									These benefits reduce the steep learning curve of visual lagnauges like Blockly and Flow compared to text code, enabling beginners to start developing logical thinking and
									computational skills much earlier.
								</p>
								<p>So, why use Flow over other visual programming languages like Blockly? There are two main reasons why we prefer Flow coding:</p>
								<ol>
									<li>
										Although it is a visual-based, Blockly is actually also an imperative langauge, just like text. This means that its execution is based on transitioning between multiple (sometimes
										disjointed) states. This can make it harder to interpret existing code and to first understand how to write more advanced code yourself. Flow however, is a funcitonal visual
										language. What this effectively means is that you can use your fingure to trace a continuous execution path throughout your code, compared to imperative languages where you would
										have discontinuities (you will have to lift your fingure and move it somewhere else). This makes it easy to figure out what code would be running and any given time and why it is
										running.
									</li>
									<li>
										Both visual langauges both require much less syntax memorisation than text langauges, making them far easier and faster to get started with. However, Blockly requires learning
										visual syntax that is only ever relevant to its own language. Although Flow also requires learning some visual syntax as well, this syntax is almost identical to how you would
										create a flow chart, a process that is often used in-industry to write <b>"pseudocode"</b> for the purposes of planning the implentation and logic of a text program. The fact that
										Flow closely mimics flowcharts is huge because this also resembles the way that most humans think. People use flowcharts during early planning processes because it is a great way
										to convert the logic in your head into a physical form that is easy to interpret. This holds true for Flow.
									</li>
								</ol>
								<p>
									We want to simplify the process for students of translating their thought processes and problem solving into runnable code that they can test and see a result. The Flow visual
									programming language allows us to do that and, in our experience, there’s no better way to start a students coding education.
								</p>
								<h2>The basics of Flow</h2>
								<p>With Flow, coding is as simple as making a flow chart:</p>
								<ol>
									<li>Drag the block you want to use into the dropzone. Each block represents one or more lines of text code.</li>
									<li>Then connect your blocks in your desired order using tracks.</li>
									<li>Click Compile and your code will run in the order determined by your tracks.</li>
								</ol>
								<p>
									There are two main use cases for tracks: 1) passing data between blocks and 2) determining the order in which they are run. We visualise these different types of information using
									different coloured tracks. Here is a quick list:
								</p>
								<ul>
									<li>
										Numerical is <span style={{ color: "#d869ea" }}>magenta</span>
									</li>
									<li>
										Boolean is <span style={{ color: "#16e3f1" }}>cyan</span>
									</li>
									<li>
										Execution order is <span style={{ color: "#fdb554" }}>orange</span>
									</li>
								</ul>
								<p>As you can see blocks, can only be connected if they have a matching information type to prevent unintended errors.</p>
								<h3>Looking to learn Flow coding? Start here</h3>
								<ul>
									<li>Read the Intro to Flow document</li>
									<li>Watch the Intro to Flow video</li>
								</ul>
								<h3>Test your skills with comaprrison and Conditional blocks</h3>
								<ul>
									<li>Comparison boost</li>
									<li>Conditional boost</li>
								</ul>
								<p>Finally see how a solution comes together by watching this video, which walks-through the solution of the Send It Project.</p>
							</>
						),
					},
					{
						query: "learning-journals",
						heading: "Learning journals",
						caption: "Need help with your learning journal? Find it here",
						tags: ["learning journals", "learning"],
						content: (
							<>
								<h2>What are learning journals?</h2>
								<p>
									Learning journals are like answer booklets for Projects and are completed by students to show proof of their work. Learning journals are specific to a Project and contain questions
									and answers that link directly to that Project. Learning journals are exclusively digital documents to enable students to paste screenshots of their code, however, they can be
									printed out if this functionality isn’t desired.
								</p>
								<h2>Why we use learning journals</h2>
								<p>
									We use learning journals to provide evidence to both teachers and students. Teachers can refer to completed learning journals to track the journey of a student through a Project. In
									this scenario, student answers provide evidence that the student has completed their work toan appropriate standard. Students can also refer to their learning journals to remind
									themselves of their past work in a Project. This may be in a holistic sense as partof their review process but can also occur during normal Project work. For example, students might
									detail out an algorithm as part of a Plan step which they may refer back to as a guide when working on the associated Code step.
								</p>
								<h2>Where to find learning journals</h2>
								<p>Learning journals are found on the Define step of every Project.</p>
								<ol>
									<li>Open a project</li>
									<li>Head to the Define tab</li>
									<li>Open the learning journal in either Google Docs or Word and save a local copy</li>
								</ol>
								<h2>How to use learning journals</h2>
								<p>
									As a teacher, how you use learning journals in your classroom or online is completely up to you, however, we highly recommend using them to provide documentation for students to
									share and reflect on at the end of their project.
								</p>
							</>
						),
					},
				],
			},
			{
				query: "my-groups",
				heading: "My groups",
				articles: [
					{
						query: "what-are-groups",
						heading: "What are groups",
						caption: "Find out how groups work on the CreateBase platform",
						tags: ["groups", "schools", "families"],
						content: (
							<>
								<p>To use the CreateBase platform you need to be part of a group. Groups can either be a learning institutions like schools or a family (coming soon).</p>
								<p>
									School groups are managed by <b>admin accounts</b> and must contain all of the teachers and students who will use the platform.
								</p>
								<p>Learn how to add users to your group here.</p>
								<p>
									Register a group <Link href="/my-groups/new-school">here</Link>.
								</p>
							</>
						),
					},
				],
			},
			{
				query: "my-account",
				heading: "My account",
				articles: [
					{
						query: "groups",
						heading: "Groups",
						caption: "Find out how groups work",
						tags: ["my groups", "school", "family"],
						content: (
							<>
								<p>A single CreateBase account can belong to multiple groups. Groups can either be a learning institution (school/other) or a family (coming soon).</p>
								<p>From the "My Account" tab, you can view all the groups your account has joined.</p>
							</>
						),
					},
					{
						query: "group-roles",
						heading: "Group roles",
						caption: "Learn about the difference between admins, teachers and students",
						tags: ["groups", "admin", "teacher", "student", "roles"],
						content: (
							<>
								<p>Within groups, there are different types of roles. For schools, there are three types:</p>
								<ul>
									<li>
										<b>Admins</b>—the admin role has access to the entire group. They are responsible for managing teachers and students. For example, this include approving teacher’s join requests
										and updating billing information for the group.
									</li>
									<li>
										<b>Teachers</b>—the teacher role has access to most of the platform. Teachers are mainly responsible for teaching and managing their classes.
									</li>
									<li>
										<b>Students</b>—the student role has the most restricted access. They can only use the learning content of Projects.
									</li>
								</ul>
								<p>Each student in a class needs their own account to access the platform for tracking, management, and administrative purposes.</p>
							</>
						),
					},
					{
						query: "security",
						heading: "Security",
						caption: "Not sure how to reset your password? Learn how here",
						tags: ["reset", "password"],
						content: (
							<>
								<p>
									You can change your password from the <Link href="/my-account">My Account tab</Link>.
								</p>
								<p>If you have forgotten your password, it can be reset from the login page using your email address.</p>
							</>
						),
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
						content: (
							<>
								<p>
									You can contact us for any reason via email at <a href="mailto: admin@createbase.co.nz">admin@createbase.co.nz</a> or send a message from the contact form on our{" "}
									<Link href="createbase.co.nz">website</Link>.
								</p>
								<p>We aim to respond to any questions, comments or enquiries within 1 working day.</p>
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
