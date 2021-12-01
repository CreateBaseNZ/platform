import Link from "next/link";

export const GETTING_STARTED_ON_CREATEBASE = {
	admin: (
		<>
			<p>This Getting Started video explains the basics to start you on your journey on the CreateBase platform.</p>
			<p>This is the same as your onboarding video, so if you can remember that then there is no need to rewatch it.</p>
			<iframe
				src="https://www.youtube.com/embed/2fOdfDHPyGc"
				title="How-To: Get started as a teacher"
				className="embedded-video-16-9"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
		</>
	),
	teacher: (
		<>
			<p>This Getting Started video explains the basics to start you on your journey on the CreateBase platform.</p>
			<p>This is the same as your onboarding video, so if you can remember that then there is no need to rewatch it.</p>
			<iframe
				src="https://www.youtube.com/embed/2fOdfDHPyGc"
				title="How-To: Get started as a teacher"
				className="embedded-video-16-9"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
		</>
	),
	student: (
		<>
			<p>This Getting Started video explains the basics to start you on your journey on the CreateBase platform.</p>
			<p>This is the same as your onboarding video, so if you can remember that then there is no need to rewatch it.</p>
			<iframe
				src="https://www.youtube.com/embed/Fd9pVmFwVd8"
				title="How-To: Get started as a student"
				className="embedded-video-16-9"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
		</>
	),
};

export const JOIN_A_SCHOOL = {
	admin: (
		<>
			<p>As the admin of a school, you will need to accept join requests from teachers looking to join your school on our platform.</p>
			<p>For reference, this is the process teachers go through to join a school:</p>
			<ol>
				<li>
					From the My Groups page teachers click "Join a school"
					<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/join a school.JPG" style={{ maxWidth: 800 }} />
				</li>
				<li>Teachers search for their school</li>
				<li>
					Then complete and send a message
					<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/teach joins school gif.gif" style={{ maxWidth: 800 }} />
				</li>
				<li>The Admin of the school will be notified and can accept or reject the request</li>
			</ol>
			<p>Join request messages can be viewed from the inbox tab.</p>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/join a school admin inbox.JPG" style={{ maxWidth: 800 }} />
			<p>Once accepted, the teacher will gain access to teaching content, will be able to create classes and will be able to manage the students in your school group.</p>
			<iframe
				src="https://www.youtube.com/embed/K9BLb9clLRk"
				title="How-To: Register or join your school as a teacher"
				className="embedded-video-16-9"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
		</>
	),
	teacher: (
		<>
			<p>Joining a school starts on the My Groups page.</p>
			<img srcr="/support/join a school.JPG" style={{ maxWidth: 800 }} />
			<p>As a teacher, search for the name of your school.</p>
			<p>Then complete and send a message.</p>
			<img srcr="/support/teach joins school gif.gif" style={{ maxWidth: 800 }} />
			<p>The admin of the school will be notified and you will need to wait for them to accept or reject your request.</p>
		</>
	),
	student: (
		<>
			<p>To join your school, click "Join a school" and then enter the code given to you by your teacher.</p>
			<img srcr="/support/join a school student.JPG" style={{ maxWidth: 800 }} />
			<p>If you have not received a student code, ask your teacher to click "Add" on their Manage Group page and share this code with you.</p>
			<iframe
				src="https://www.youtube.com/embed/Fd9pVmFwVd8"
				title="How-To: Get started as a student"
				className="embedded-video-16-9"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
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
				language allows us to do that and, in our experience, there's no better way to start a student's coding education.
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
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/flow code.gif" style={{ maxWidth: 800 }} />
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
				functionality isn't desired.
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
				<li>
					Open the learning journal in either Google Docs or Word and save a local copy
					<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/learning journal final.gif" style={{ maxWidth: 800 }} />
				</li>
			</ol>
			<h2>How do I use learning journals?</h2>
			<p>
				As a teacher, how you use learning journals in your classroom or online is completely up to you, however, we highly recommend using them to provide documentation for students to share and
				reflect on at the end of their project.
			</p>
			<p>
				As a student, your teacher will let you know how they want you to use your learning journal as you complete the Project. Even if they don't explicitly instruct you to use one, we still
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
				Groups can either be a learning institution (school/other) or a family (coming soon). School groups are managed by <Link href="/support/admins/group-roles">admin accounts</Link> and must
				contain all of the teachers and students in your school who wish to use the platform.
			</p>
			<p>
				Learn how to register or join a school group <Link href={`/support/admins/register-or-join-your-school`}>here</Link>.
			</p>
			<p>
				Learn how to add students to your group <Link href="/support/admins/adding-students">here</Link>.
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
					<b>Admins</b>—the admin role has access to the entire group. They are responsible for managing teachers and students. For example, this include approving teacher's join requests and updating
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

export const CONTACTING_CREATEBASE = {
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

export const THE_5_STEP_CREATION_PROCESS = {
	staff: (
		<>
			<p>
				The CreateBase 5 Step Creation Process is unique to our platform. Its purpose is to give students a repeatable framework to follow when building solutions to difficult problems. Students can
				apply this process anywhere, both inside and outside of the platform.
			</p>
			<p>Our Creation Process has been developed by some of the best engineering graduates from the University of Auckland alongside leading STEAM and Digital Technologies teachers.</p>
			<p>The 5 Step Creation Process is a fundamental structure that's built into all the Project content on the Platform.</p>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/5 step creation steps.JPG" style={{ width: 400 }} />
			<p>The Creation Process is reflected in the Project view</p>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/5 step creation project view.JPG" style={{ maxWidth: 800 }} />
			<p>learning journals ...</p>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/5 step creation learning journal.JPG" style={{ maxWidth: 800 }} />
			<p>and lesson plans ...</p>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/5 step creation lesson plan.JPG" style={{ width: 400 }} />
		</>
	),
};

export const REGISTER_A_SCHOOL = {
	staff: (
		<>
			<p>Registering your school starts on the My Groups page.</p>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/register a school.JPG" style={{ maxWidth: 800 }} />
			<p>Simply complete the Registration form and our team will verify your school within 24 hours.</p>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/register a school gif.gif" style={{ maxWidth: 800 }} />
		</>
	),
};

export const CREATE_A_CLASS = {
	staff: (
		<>
			<p>To create a class head to the Classes page and click “Create class”.</p>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/create a class.JPG" style={{ maxWidth: 800 }} />
			<p>Enter a class name and you are good to go.</p>
			<p>To add Students, visit the "Manage Members" tab, click "Add" and then select all the users from your group that you want to add to your class. Click "Add" to confirm the users.</p>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/create class + add students gif.gif" style={{ maxWidth: 800 }} />
		</>
	),
};

export const STEP_1_DEFINE = {
	staff: (
		<>
			<p>When faced with a new scenario, our first step is to accurately understand the problem that we need to solve by defining key details such as:</p>
			<ul>
				<li>How did this problem occur?</li>
				<li>Where did this problem occur?</li>
				<li>What are the implications or consequences of this problem?</li>
				<li>Who is affected?</li>
			</ul>
			<p>
				By defining the problem correctly, we can target our thinking to the specific circumstances and issues that are occurring. This is incredibly important to not just solve a problem but ensure
				we solve the correct problem for the right people.
			</p>
			<p>
				Students that excel in the Define step will show an ability to identify the most meaningful details and use these to derive the problem correctly. They will be able to think beyond the
				explicit content that is provided to them as part of the Project when detailing impacts, consequences and causes.
			</p>
		</>
	),
};

export const STEP_2_IMAGINE = {
	staff: (
		<>
			<p>
				Imagine gives students the opportunity to develop their own ideas to solve the problem they defined. This can be an unconstrained exercise with activities chosen by the teacher. However, we
				also provide question prompts for class or group discussions and group or individual brainstorming/sketching.
			</p>
			<p>Benefits of this step include:</p>
			<ul>
				<li>Enabling students to showcase their creativity when unconstrained by the tools that they have access to.</li>
				<li>Solution seeking like this is used by high performing engineering teams all over the world.</li>
				<li>The craziest wild ideas can become the solution that no one was expecting.</li>
			</ul>
			<p>This makes the step hugely important to educate the great problem solvers and innovators of tomorrow.</p>
			<p>
				The Imagine step ends with students being introduced to the robotic system that they will be using in this Project to solve the problem. Students then interact with the robotic system in a
				simulated environment and discuss how the robotic system is a viable solution. After starting with a broad solution defined by the students, this second half reframes and narrows their focus
				for the tasks at hand.
			</p>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/imagine gif.gif" style={{ maxWidth: 800 }} />
		</>
	),
};

export const STEP_3_THE_CREATE_LOOP = {
	staff: (
		<>
			<h2>Overview</h2>
			<p>
				All of our Projects require students to program robotic systems to create solutions to an authentic problem. This coding occurs after Define and Imagine in the Create step. In the real world,
				software developers work through knowledge barriers and upskill themselves as they build solutions. In our platform, students create by iterating over three steps:
			</p>
			<ol>
				<li>Research the tools available to build this solution</li>
				<li>Plan how to construct the solution</li>
				<li>Code the solution using Flow or text programming and our simulations</li>
			</ol>
			<p>
				Each iteration normally comprises one sub-system. A sub-system is one component of the full solution and is normally framed as the solution to a sub-problem of the full problem. These
				iterative steps enable students to build complicated coding solutions by learning about and then implementing one iteration at a time. Students get to code and test continuously throughout the
				process rather than having to wait until the end.
			</p>
			<h2>Research</h2>
			<p>
				When solving cutting edge problems, you rarely know how to create a solution right away. A lot of the time, you don't even know what you don't know. You could be repurposing tools you've used
				before or learning about entirely new tools. Through Research, a problem solver seeks to find out the tools available to create their solution and how to use these tools.
			</p>
			<p>
				On the CreateBase platform, students answer a series of questions in their learning journals. The answers to these questions will come from interacting with the Research content on the
				platform and/or by looking up the information themselves on the internet or through other external resources.
			</p>
			<p>Potential Plan activities include:</p>
			<ul>
				<li>Researching relevant background information.</li>
				<li>Researching relevant algorithms.</li>
				<li>Researching the Flow editor and how to use it to write code.</li>
				<li>Learning to use the Flow blocks for the current sub-system.</li>
			</ul>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/research gif.gif" style={{ maxWidth: 800 }} />
			<h2>Plan</h2>
			<p>
				Code solutions can be incredibly long and complicated, especially if you don't have any structure before you start coding. During our Create process, we make students stop and think about
				everything they have learnt so far and how to structure this into a solution. Even if this first solution is not correct, the thinking students go through at this stage dictates how they will
				attempt to solve the problem, and ultimately how long it will take them to solve it.
			</p>
			<p>Potential Plan activities include:</p>
			<ul>
				<li>Choosing code blocks</li>
				<li>Identifying keywords in the problem statement</li>
				<li>Writing logic in pseudo-code</li>
				<li>Matching code blocks with pseudo-code</li>
				<li>Selecting their desired robotic system (coming soon)</li>
				<li>Selecting specific components (coming soon)</li>
			</ul>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/plan gif.gif" style={{ maxWidth: 800 }} />
			<p>
				After completing their Plan, students will not necessarily have a complete answer to the Code step, but will at least have enough information to start testing and iterating as well as a
				concrete understanding of the logical process(es) that their solution will need to follow.
			</p>
			<h2>Code</h2>
			<p>
				At the end of the day, all the research and planning needs to be turned into a working solution. The process of developing a coded solution is rarely straightforward and most of the time the
				planned solution will not work out.
			</p>
			<p>
				When arriving at Code, students start by coding their solution in the Flow or text editor. They compile this code and test it in the simulated environment. Depending on the outcome, students
				will either continue to the next iteration or will have to edit their code to get a working solution. Once the edited code is compiled, it's then tested again until the task is complete.
			</p>
			<p>
				This iterative process of code ➞ compile ➞ evaluate is driven by the feedback that students receive from the 3D simulations when they run their code. This feedback makes the code that students
				are writing much more tangible as there are clear (and sometimes catastrophic) results for every change that they make. With a digital solution, there are no consequences for breaking the
				robot so students are free to experiment and push boundaries with their testing, providing a rich opportunity for guided discovery learning.
			</p>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/code gif.gif" style={{ maxWidth: 800 }} />
		</>
	),
};

export const STEP_4_IMPROVE = {
	staff: (
		<>
			<p>
				Once a working solution has been created, the development focus turns to how this solution could be improved. Improvements are built upon the original idea and are usually driven by industry
				competition, technological advancements or a changing problem.
			</p>
			<p>
				On the CreateBase platform, Improve gives students a chance to apply what they have learnt in more difficult circumstances with less guidance. It seeks to widen the scope of students'
				abilities through multiple expansion pathways.
			</p>
			<p>Potential activities include:</p>
			<ul>
				<li>Solution optimisation</li>
				<li>Problem extensions</li>
				<li>Text-based coding</li>
			</ul>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/improve gif.gif" style={{ maxWidth: 800 }} />
			<p>
				Although every student should be able to complete the Create step, the Improve step is often more open-ended, with room for students to create increasingly better-performing solutions. This
				makes the Improve step an ideal place to cultivate the abilities of excelling students as an extension activity.
			</p>
		</>
	),
};

export const STEP_5_REVIEW = {
	staff: (
		<>
			<h2>Overview</h2>
			<p>
				Review is the final step of each Project, where students will analyse what they have accomplished throughout the Project by reflecting on their work and sharing any outcomes with their peers.
				Share and reflect can be used interchangeably depending on class/teacher preference (or do both!). Either way, students will gain value by understanding their own or their peers' journeys
				through the Project. To help complete these tasks, students fill out a learning journal while progressing through the Project that they can refer back to as a reminder or to provide evidence.
			</p>
			<h2>Share</h2>
			<p>
				By sharing their solutions or other outcomes, students will gain a deeper understanding of their solutions as they find a way to communicate their thoughts with their peers. They also get to
				hear about the solutions, difficulties and successes of their peers. There are many different ways to complete each Project. Hearing about the outcomes of other students and the thought
				processes that they underwent to arrive at their solutions provides opportunities to think about how they could further improve their own solution or the other paths that they could have
				taken.
			</p>
			<h2>Reflect</h2>
			<p>
				Reflecting on the learning journey is a key method to emphasise learning from our mistakes and our successes. Reflection is not always easy, so we provide questions to engage students in the
				process of reflection. This is a solo activity, so it is perfect for distance learning!
			</p>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/review gif.gif" style={{ maxWidth: 800 }} />
		</>
	),
};

export const LESSON_PLANS = {
	staff: (
		<>
			<h2>Overview</h2>
			<p>Every Project on the CreateBase Platform comes with a pre-written set of lesson plans co-written by leading STEAM and Digital technology teachers.</p>
			<p>
				Just like Projects themselves, lesson plans are structured to our 5 Step Creation Process, so it is easy to know what you're teaching and when to progress. In fact, using lesson plans reduces
				the time it takes to prepare for each lesson significantly. In saying this, lesson plans are entirely optional. They serve as an example of how the content could be delivered as part of a
				classroom setting, but you are free to integrate our Projects into your lessons in any way that you please.
			</p>
			<p>To access lesson plans:</p>
			<ul>
				<li>Choose a Project from the Project Library</li>
				<li>Open the teaching tab</li>
				<li>Open or download the lesson plan pdf</li>
			</ul>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/lesson plan gif.gif" style={{ maxWidth: 800 }} />
			<p>And presto, it's that easy.</p>
			<h2>Learning about the concepts you're teaching</h2>
			<p>
				Some of the concepts that you see in lesson plans may be beyond your current understanding. To help you upskill, lesson plans contain links to external resources that can help you better
				understand the content.
			</p>
			<p>
				If you're still having trouble, we recommend working around that content in your lesson as a lot of content can be removed, substituted or added depending on what you feel comfortable teaching
				and what you think your students will best respond to.
			</p>
			<h2>How we help achieve the curriculum</h2>
			<p>
				Each project has a series of learning outcomes for your students. These rubrics show what students should be able to do/know when the Project is delivered using the CreateBase lesson plans.
				You can use these learning outcomes to figure out the best way and time to integrate each CreateBase Project into your curriculum.
			</p>
			<p>Learning outcomes can be found by selecting a Project and opening the learning tab or at the front of that Project's lesson plan.</p>
		</>
	),
};

export const REGISTER_OR_JOIN_YOUR_SCHOOL = {
	staff: (
		<>
			<h2>Register</h2>
			<p>Registering your school starts by completing the registration form on the My Groups page.</p>
			<p>
				Each form is individually verified by our team to ensure that bad actors can’t make fake schools on our Platform. Once a form is submitted, our team will get in touch via email within 24 hours
				to notify you of your School’s registration. Upon positive confirmation, your school group will be formed and you will automatically become the{" "}
				<Link href="/support/admins/group-roles">admin user</Link>.
			</p>
			<p>
				In these 24 hours, please feel free to learn more about our platform from the Support tab or complete our <Link href="/onboarding">Platform Onboarding</Link>. You can also experience the
				non-teaching aspects of Projects from the Browse tab.
			</p>
			<h2>Join</h2>
			<p>If your school has already been registered, you simply join the school instead!</p>
			<p>From the My Groups page click "Join" and then send a message to the admin (the user who registered the school).</p>
			<p>The admin can then accept your request.</p>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/join a school.JPG" style={{ maxWidth: 600 }} />
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/teach joins school gif.gif" style={{ maxWidth: 600 }} />
			<p>For students to join a school, they must use a student code.</p>
			<p>
				Learn how to add students to your school <Link href="/support/admins/adding-students">here</Link>.
			</p>
		</>
	),
};

export const ADDING_STUDENTS = {
	staff: (
		<>
			<p>Adding students to your group is a requirement to teach on the platform. To do this students must:</p>
			<ol>
				<li>
					Create their own account
					<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/join a school student.JPG" style={{ maxWidth: 800 }} />
				</li>
				<li>
					Open the My Groups tab and select join a group
					<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/adding students student process gif.gif" style={{ maxWidth: 800 }} />
				</li>
				<li>Enter the student code</li>
			</ol>
			<p>You can find the student code for your group by clicking "Add" on the Manage Group page.</p>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/student code.JPG" style={{ maxWidth: 800 }} />
		</>
	),
};

export const MANAGE_USERS_IN_YOUR_SCHOOL = {
	staff: (
		<>
			<p>
				To use the Manage Users tab, please note that you need to be an <Link href="/support/admins/group-roles">admin</Link> or a <Link href="/support/teachers/group-roles">teacher</Link> in a{" "}
				<Link href="/support/admins/what-are-groups">group</Link>.
			</p>
			<p>In the Manage Users tab, you can view all the accounts that have joined your group.</p>
			<p>Users are grouped based on their role within the group: admin, teacher or student.</p>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/manage users gif.gif" style={{ maxWidth: 800 }} />
			<p>For all users, you can view their first name, last name, email and who invited them.</p>
			<p>On this page admins can:</p>
			<ul>
				<li>Remove teacher accounts</li>
				<li>Remove student accounts</li>
				<li>Promote teacher accounts to admins</li>
			</ul>
			<p>On this page teachers can:</p>
			<ul>
				<li>Remove student accounts.</li>
			</ul>
		</>
	),
};

export const RECOVER_STUDENT_PASSWORDS = {
	staff: (
		<>
			<p>All passwords can be reset with the "Forgot password" button on the login page.</p>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/login screen.JPG" style={{ maxWidth: 800 }} />
			<p>Students can then change their own passwords from their Account tab.</p>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/account reset password.JPG" style={{ maxWidth: 800 }} />
		</>
	),
};

export const STUDENT_TRACKING = {
	staff: (
		<>
			<h2>Overview</h2>
			<p>As students interact with the platform, some of their actions are automatically tracked. This data is compiled for you, their teacher, in the classes that they have been added to.</p>
			<p>Three metrics are provided:</p>
			<ol>
				<li>Progress</li>
				<li>Engagement (coming soon)</li>
				<li>Performance (coming soon)</li>
			</ol>
			<h2>Progress</h2>
			<p>
				The progress metric measures how far a student has progressed in a Project. This metric is measured using the pages that a user has visited, the time they spend on each page, and the
				completion or partial completion of coding activities.
			</p>
			<p>This metric is displayed in the Progress table on the My Classes page.</p>
			<ul>
				<li>
					<span style={{ color: "#999999", fontWeight: "500" }}>Blank</span>—no page visits.
				</li>
				<li>
					<span style={{ color: "#fdd135", fontWeight: "500" }}>Yellow</span>—a short amount of time spent on the page or unfinished code.
				</li>
				<li>
					<span style={{ color: "#18dbac", fontWeight: "500" }}>Green</span>—an adequate amount of time spent on the page or completed code.
				</li>
			</ul>
			<p>You can also hover over entries in the table to get more information.</p>
			<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/student tracking data.JPG" style={{ maxWidth: 800 }} />
			<h2>Engagement (coming soon)</h2>
			<h2>Performance (coming soon)</h2>
		</>
	),
};
