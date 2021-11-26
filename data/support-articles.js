import Link from "next/link";

export const GETTING_STARTED_ON_CREATEBASE = {
	admin: (
		<>
			<p>This Getting Started video explains the basics to start you on your journey on the CreateBase platform.</p>
			<p>This is the same as your onboarding video, so if you can remember that then there is no need to rewatch it.</p>
		</>
	),
	teacher: (
		<>
			<p>This Getting Started video explains the basics to start you on your journey on the CreateBase platform.</p>
			<p>This is the same as your onboarding video, so if you can remember that then there is no need to rewatch it.</p>
		</>
	),
	student: (
		<>
			<p>This Getting Started video explains the basics to start you on your journey on the CreateBase platform.</p>
			<p>This is the same as your onboarding video, so if you can remember that then there is no need to rewatch it.</p>
		</>
	),
};

export const JOIN_A_SCHOOL = {
	admin: (
		<>
			<p>As the admin of a school, you will need to accept join requests from teachers looking to join your school on our platform.</p>
			<p>For reference, this is the process teachers go through to join a school:</p>
			<ol>
				<li>From the My Groups page teachers click "Join a school"</li>
				<li>Teachers search for their school</li>
				<li>Then complete and send a message</li>
				<li>The Admin of the school will be notified and can accept or reject the request</li>
			</ol>
			<p>Join request messages can be viewed from the inbox tab.</p>
			<p>Once accepted, the teacher will gain access to teaching content, will be able to create classes and will be able to manage the students in your school group.</p>
		</>
	),
	teacher: (
		<>
			<p>Joining a school starts in the My Groups page.</p>
			<p>As a teacher, search for the name of your school.</p>
			<p>Then complete and send a message.</p>
			<p>The admin of the school will be notified and you will need to wait for them to accept or reject your request.</p>
		</>
	),
	student: (
		<>
			<p>To join your school, click "Join a school" and then enter the code given to you by your teacher.</p>
			<p>If you have not received a student code, ask your teacher to click "Add" on their Manage Group page and share this code with you.</p>
		</>
	),
};

export const FLOW_CODING = {
	shared: (
		<>
			<p>The CreateBase Platform uses a visual coding language called Flow. Flow code is not a new concept and has huge benefits for beginner coders.</p>
			<h2>Why use Flow coding?</h2>
			<p>Firstly, why do we use a visual language?</p>
			<p>Visual languages have 3 key benefits:</p>
			<ul>
				<li>
					<b>Readability</b>—it is easy to read existing code and understand what it does when laid out visually.
				</li>
				<li>
					<b>Ease of use</b>—it is quick and easy to get started writing code using the language as there is far less syntax and complicated logic to memorise.
				</li>
				<li>
					<b>Debugging</b>—visual code is easier to debug for beginners with its visual representation and constrained syntax.
				</li>
			</ul>
			<p>
				These benefits reduce the steep learning curve of visual languages like Blockly and Flow compared to text code, enabling beginners to start developing logical thinking and computational skills
				much earlier.
			</p>
			<p>So, why use Flow over other visual programming languages like Blockly? There are two main reasons why we prefer Flow coding:</p>
			<ol>
				<li>
					Although it is visual-based, Blockly is an{" "}
					<a href="https://en.wikipedia.org/wiki/Imperative_programming" target="_blank">
						imperative
					</a>{" "}
					language which means that its execution is based on transitioning between multiple (sometimes disjointed) states. To know what the output of any given fragment of code does, you need to know
					information about the prior state of the program. This can make it harder to interpret existing code and understand how to write more advanced code yourself. Flow, however, is a{" "}
					<a href="https://en.wikipedia.org/wiki/Declarative_programming" target="_blank">
						declarative
					</a>{" "}
					<a href="https://en.wikipedia.org/wiki/Flow-based_programming" target="_blank">
						flow-based
					</a>{" "}
					language where the focus is upon composing the problem as a set of functions to be executed. Users select their desired functions based on the problem and pass in data rather than the
					current state. Since each function only relies on its data inputs, there are no hidden states to track and all functions are ready at the same time. Another advantage of flow-based
					programming is that you can use your finger to trace a continuous execution path throughout your code, compared to imperative languages where you may have discontinuities (you will have to
					lift your finger and move it somewhere else). This makes it easy to figure out what code would be running at any given time and why it is running.
				</li>
				<li>
					Both visual languages both require much less syntax memorisation than text languages, making them far easier and faster to get started with. However, Blockly requires learning visual syntax
					that is only ever relevant to its own language. Although Flow also requires learning some visual syntax as well, this syntax is almost identical to how you would create a flow chart, a
					process that is often used in industry to write “pseudocode” for the purposes of planning the implementation and logic of a text program. The fact that Flow closely mimics flowcharts is huge
					because this also resembles the way that most humans think. People use flowcharts during early planning processes because it is a great way to convert the logic in your head into a physical
					form that is easy to interpret. This holds true for Flow.
				</li>
			</ol>
			<p>
				We want to simplify the process for students of translating their thought processes and problem-solving into runnable code that they can test and see a result. The Flow visual programming
				language allows us to do that and, in our experience, there’s no better way to start a student’s coding education.
			</p>
			<h2>The basics of Flow coding</h2>
			<p>With Flow, coding is as simple as making a flowchart:</p>
			<ol>
				<li>Drag the block you want to use into the dropzone. Each block represents one or more lines of text code.</li>
				<li>Then connect your blocks in your desired order using tracks.</li>
				<li>Click Compile and your code will run in the order determined by your tracks.</li>
			</ol>
			<p>There are two main use cases for tracks:</p>
			<ol>
				<li>Passing data between blocks, and</li>
				<li>Determining the order in which they are run</li>
			</ol>
			<p>We visualise these different types of information using different coloured tracks:</p>
			<ul>
				<li>
					Numerical is <span style={{ color: "#d869ea", fontWeight: "500" }}>magenta</span>
				</li>
				<li>
					Boolean is <span style={{ color: "#16e3f1", fontWeight: "500" }}>cyan</span>
				</li>
				<li>
					Execution order is <span style={{ color: "#fdb554", fontWeight: "500" }}>orange</span>
				</li>
			</ul>
			<p>As you can see, blocks can only be connected if they have a matching information type to prevent unintended errors.</p>
			<h2>Looking to learn Flow coding?</h2>
			<ul>
				<li>
					Read the{" "}
					<a href="/intro-to-flow.pdf" target="_blank">
						Intro to Flow
					</a>{" "}
					document
				</li>
				<li>
					Watch the{" "}
					<a href="https://www.youtube.com/watch?v=2Ndwtpk7iN8" target="_blank">
						Intro to Flow
					</a>{" "}
					video
				</li>
			</ul>
			<h2>Test your skills with comparison and conditional blocks</h2>
			<ul>
				<li>
					<Link href="/explore/comparison-boost">Comparison boost</Link>
				</li>
				<li>
					<Link href="/explore/if-boost">If boost</Link>
				</li>
			</ul>
			<p>Finally, see how a solution comes together by watching this video which walks through the solution of the Send It project.</p>
		</>
	),
};

export const LEARNING_JOURNALS = {
	shared: (
		<>
			<h2>What are learning journals?</h2>
			<p>
				Learning journals are like answer booklets for Projects and are completed by students to show proof of their work. Learning journals are specific to a Project and contain questions and answers
				that link directly to that Project. Learning journals are exclusively digital documents to enable students to paste screenshots of their code; however, they can be printed out if this
				functionality isn’t desired.
			</p>
			<h2>Why are learning journals useful?</h2>
			<p>
				We use learning journals to provide evidence to both teachers and students. Teachers can refer to completed learning journals to track the journey of a student through a Project. In this
				scenario, student answers provide evidence that the student has completed their work to an appropriate standard. Students can also refer to their learning journals to remind themselves of
				their past work in a Project. This may be in a holistic sense as part of their review process but can also occur during regular Project work. For example, students might detail an algorithm as
				part of a Plan step, which they may refer to as a guide when working on the associated Code step.
			</p>
			<h2>Where do I find learning journals?</h2>
			<p>Learning journals are found on the Define step of every Project.</p>
			<ol>
				<li>Open a Project</li>
				<li>Head to the Define tab</li>
				<li>Open the learning journal in either Google Docs or Word and save a local copy</li>
			</ol>
			<h2>How do I use learning journals?</h2>
			<p>
				As a teacher, how you use learning journals in your classroom or online is completely up to you, however, we highly recommend using them to provide documentation for students to share and
				reflect on at the end of their project.
			</p>
			<p>
				As a student, your teacher will let you know how they want you to use your learning journal as you complete the Project. Even if they don’t explicitly instruct you to use one, we still
				recommend downloading a copy as it provides instructions for how to progress through the Project.
			</p>
		</>
	),
};

export const WHAT_ARE_GROUPS = {
	staff: (
		<>
			<p>
				To use the CreateBase platform you need to be part of a group. From the "My Account" tab, you can view all the groups your account has joined. A single CreateBase account can belong to
				multiple groups.
			</p>
			<p>
				Groups can either be a learning institution (school/other) or a family (coming soon). School groups are managed by <Link href="/support/admin/group-roles">admin accounts</Link> and must
				contain all of the teachers and students in your school who wish to use the platform.
			</p>
			<p>
				Learn how to register or join a school group <Link href={`/support/admin/register-or-join-your-school`}>here</Link>.
			</p>
			<p>
				Learn how to add students to your group <Link href="/support/admin/adding-students">here</Link>.
			</p>
		</>
	),
	student: (
		<>
			<p>
				To use the CreateBase platform you need to be part of a group. From the "My Account" tab, you can view all the groups your account has joined. A single CreateBase account can belong to
				multiple groups.
			</p>
			<p>
				Groups can either be a learning institution (school/other) or a family (coming soon). School groups are managed by <Link href="/support/students/group-roles">admin accounts</Link> and must
				contain all of the teachers and students in your school who wish to use the platform.
			</p>
			<p>
				Learn how to join a school group <Link href="/support/students/join-a-school">here</Link>.
			</p>
		</>
	),
};

export const GROUP_ROLES = {
	shared: (
		<>
			<p>Within groups, there are different types of roles. For schools, there are three types:</p>
			<ul>
				<li>
					<b>Admins</b>—the admin role has access to the entire group. They are responsible for managing teachers and students. For example, this include approving teacher’s join requests and updating
					billing information for the group.
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
};

export const SECURITY = {
	shared: (
		<>
			<p>
				You can change your password from the <Link href="/my-account">My Account tab</Link>.
			</p>
			<p>If you have forgotten your password, it can be reset from the login page using your email address.</p>
		</>
	),
};

export const CONTACING_CREATEBASE = {
	shared: (
		<>
			<p>
				You can contact us for any reason via email at <a href="mailto: admin@createbase.co.nz">admin@createbase.co.nz</a> or send a message from the contact form on our{" "}
				<Link href="createbase.co.nz">website</Link>.
			</p>
			<p>We aim to respond to any questions, comments or enquiries within one working day.</p>
		</>
	),
};

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
