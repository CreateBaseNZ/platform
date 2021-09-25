import Link from "next/dist/client/link";

export default [
	{
		header: "How-To: Videos",
		icon: "ondemand_video",
		items: [
			{
				q: "How-To: Sign up with an Educator account",
				a: (
					<>
						<p>
						<a href="https://youtu.be/09j-Opsyd0o" target="_blank" title="How-To: Sign up with an educator account">View here </a>	
						</p>
						
					</>
				),
			},
			{
				q: "How-To: Register an Organisation",
				a: (
					<>
						<p>
						<a href="https://youtu.be/6QTpDvfDZ9s" target="_blank" title="How-To: Register an Organisation">View here </a>	
						</p>
						
					</>
				),
			},
			{
				q: "How-To: Use invite features",
				a: (
					<>
						<p>
						<a href="https://youtu.be/GphwKgAv6kw" target="_blank" title="How-To: Use invite features">View here </a>	
						</p>
					</>
				),
			},
			{
				q: "How-To: Join an Organisation",
				a: (
					<>
						<p>
						<a href="https://youtu.be/AQ6acGxQZwE" target="_blank" title="How-To: Join an Organisation">View here </a>	
						</p>
					</>
				),
			},
			{
				q: "How-To: Sign up with a Learner account",
				a: (
					<>
						<p>
						<a href="https://youtu.be/s80cEkCQXIE" target="_blank" title="How-To: Sign up with a learner account">View here </a>	
						</p>
					</>
				),
			},
		],
	},
	
	
	
	{
		header: "Teacher Aid",
		icon: "class",
		items: [
			/*{
				q: "How do I create FAQ questions+answers?",
				a: (
					<>
						<p>
							Each set of `p` tags will create a paragraph, which is a chunk of regular text with normal line separation and the standard font size and style. Adding additional `p` tag sets will
							create more paragraphs, each slightly separated like so:
						</p>
						<p>
							You can add bold text by adding the `faq__bold` class and it will appear <span className="faq__bold">like this</span>. You can add <span className="faq__italic">italic text</span> with
							`faq__italic`, and <span className="faq__highlight">highlight text</span> with `faq__highlight` classes. Combination styling is also possible, just add each class separated by spaces;
							here is one using <span className="faq__bold faq__italic faq__highlight">all three</span> of the prior classes.
						</p>
						<p>
							Links can be added using `a` tags and the associated hyperlink (as `href`). For internal links, just use the relative path, e.g. this one goes to the
							<a href="/browse" target='_blank'>Browse page</a>. For external sites, just paste the regular URL, e.g. our <a href="https://createbase.co.nz/">website</a>. Note that `target='_blank'` has been set in order to open the link in a new tab (which is important for retaining users on our platform). To link to another item on
							this page, use the `Link` element and set an `href` with `/faq/X-Y` where X is the section and Y is the item (and note `target='_blank'` is not set here as we want to view another item and not open a new tab). Keep in mind that indices begin at 0,
							<Link href="/faq/1-3">e.g. this link goes to section 1 item 3</Link>. To add tooltips, just use the `title` attribute, and this will be handles natively{" "}
							<span title="You found the secret tooltip">(hover here)</span>.
						</p>
						<ol>
							Ordered and unordered lists are `ol` and `ul` tags, respectively.
							<li>Here's an</li>
							<li>Ordered list</li>
							<li>
								And a nested
								<ul>
									<li>Unordered</li>
									<li>List</li>
								</ul>
							</li>
							<li>
								Using `p` tags in `li`'s is also possible, and it will
								<p>Look like</p>
								<p>This</p>
							</li>
						</ol>
						<p className="faq__indent">
							Speaking of indentation, use the `faq__indent` class to indent. Just be aware that this class simply adds a margin to the left. If you use it on a `p` element, then the entire paragraph
							will be indented. But if you use it on a `span` then it will just look <span className="faq__indent">like this</span>.
						</p>
						<p>
							<span className="faq__indent">If</span> you only want to indent the first line, wrap the first word in `span` and add the class to it. Now when there's multiple lines, only the first
							line will be indented and the remaining lines will not be indented, just like this.
						</p>
						<p>
							To add an image, use the `img` self-enclosed tag and adding the `src` url. Please make sure all FAQ images are in `/public/faq`. Remember the url begins in the `/public` folder, so all
							image url's should begin with `/faq/...`
						</p>
						<img src="/faq/faq-1.jpg" />
						<p>
							Be sure to wrap the entire answer in empty tags. Look at the code for an example of <span style={{ color: "red", textDecoration: "underline" }}>custom styling</span>. If you need any
							more styling options, let Louis know.
						</p>
					</>
				),
			}, */
			{
				q: "How do I access lesson plans?",
				a: (
					<>
						<p>
							Each Project has its own set of 5-10 lesson plans. To access a Project’s lesson plans, click on the Project image at the bottom of the screen that corresponds to the Project you are
							interested in. The ‘Teaching’ tab will then appear. Click on that tab to reveal the teaching resources.
						</p>
						<img src="/faq/faq-1-1.jpg" />
						<p>You can now click on the “Lesson Plan” button to open all the lesson plans for that Project in a new tab.</p>
						<img src="/faq/faq-1.jpg" />
						<p>
							The lesson plan button will only appear if you are signed in with an educator account. If you cannot see the button and are not signed in, you can sign in with an educator account in the
							top right of the screen.
						</p>
						<img src="/faq/faq-4.jpg" />
					</>
				),
			},
			{
				q: "How do I use lesson plans in my classroom?",
				a: (
					<>
						<p>How you use lesson plans is entirely up to you! Each lesson plan comes structured in a straightforward way and contains everything you need to deliver the Project.</p>
						<p>If it is your first time delivering a lesson like this, then we recommend following the lesson plan step-by-step.</p>
						<p>If you feel more confident about the Project, you are also free to adapt the lesson plans to suit your teaching style.</p>
						<p>There are no restrictions or pre-requisites in place on the platform so feel free to skip over any content as you see fit or add in your own content throughout the Project.</p>
					</>
				),
			},
			{
				q: "How do I use lesson plans during online lessons?",
				a: (
					<>
						<p>Exactly as you would in a regular class environment!</p>
						<p>
							If your school is running structured lessons through video meeting platforms, we recommend using breakout rooms for class discussions. All other tasks can be completed in the lesson as
							per the lesson plan or as homework activities. If an individual student needs additional help or guidance, you can ask them to temporarily share their screen (potentially in a breakout
							room) so that you can see what they are doing and guide them more closely.
						</p>
						<p>
							If your school is not running regular lessons or has poor turnout, then you can instead skip over the class discussion parts of the lesson plans and assign students individual tasks
							(e.g. complete the Research step by DD/MM/YYYY). We recommend you use the learning journal to set completion targets for your class and have them share with you their progress by making
							their learning journals available to you through email or google classroom.
						</p>
					</>
				),
			},
			{
				q: "Where can I learn about the concepts I'm teaching?",
				a: (
					<>
						<p>
							Each lesson plan includes a glossary at the start of each section. This contains explanations for all of the terminology that you need to know in order to be able to effectively deliver
							the Project and have class discussions.
						</p>
						<img src="/faq/faq-7.jpg" />
						<p>
							Each Project will include links to additional resources. Reading and understanding this content is optional; however, they are an excellent place to start if you want to learn more about
							any of the content covered in the Project.
						</p>
						<p>If you would like to have extended discussions on any of the topics covered in the Project, you can supplement the Project content with your own research.</p>
					</>
				),
			},
			{
				q: "What can I do to be comfortable teaching this content?",
				a: (
					<>
						<p>We recommend going through the Project lesson plan and content on the platform yourself before you start teaching the lesson to familiarise yourself with its content and structure.</p>
						<p>If you want to feel more confident with a Project's content and topics, then try reading through some of the additional resources supplied throughout each Project's lesson plan.</p>
					</>
				),
			},
		],
	},
	{
		header: "Projects",
		icon: "foundation",
		items: [
			{
				q: "What is a Project?",
				a: (
					<>
						<p>
							Projects provide interactive and engaging STEAM experiences to students by walking them through the process of solving a real-world problem by applying STEAM concepts though our seven
							step creation process. This process has been crafted to provide value to any student as a framework to approach any engineering problem.
						</p>
						<p>Projects are delivered through a combination of teachers and our platform. To help teachers deliver Projects, each one comes with a detailed and customisable lesson plan.</p>
					</>
				),
			},
			{
				q: "What is Flow coding?",
				a: (
					<>
						<p>
							All of our Projects use the Flow programming language purposefully built by CreateBase to enable students and teachers to learn about coding concepts and code solutions to our Projects.
						</p>
						<img src="/faq/faq-6.jpg" />
						<p>
							Flow coding is designed to be easy to learn for teachers and students, being analogous to creating a logic-based flowchart. This is because we want the coding section of each Project to
							be based around learning logical thinking, information flow, computational skills, and problem-solving, without the need for memorising lots of arbitrary syntaxes.
						</p>
						<p>
							If you want to gain some hands-on experience with Flow coding, visit the Create or Improve steps of any Project. Additionally, check out any of the following links (a full introductory
							tutorial is coming soon):
						</p>
						<ul>
							<li>
								<a href="/intro-to-flow.pdf" target="_blank">
									Intro to Flow pdf
								</a>
							</li>
							<li>
								<a href="/explore/comparison-boost" target="_blank">
									Comparison boost
								</a>
							</li>
							<li>
								<a href="/explore/conditional-boost" target="_blank">
									Conditional boost
								</a>
							</li>
						</ul>
					</>
				),
			},
			{
				q: "What are learning journals?",
				a: (
					<>
						<p>Learning journals are where students document what they've done throughout their Project journey.</p>
						<p>Learning journals are found under the Imagine step in each Project and are available as either a Google Doc or Microsoft Word file.</p>
						<img src="/faq/faq-8.jpg" />
						<p>
							Like with most content in a Project, learning journals are optional for teachers. If you do not want your students to complete a learning journal or you want to replace them with your
							own, then you are free to do so. If you are going to do either of these, then make sure that you communicate it clearly to your class. We would also appreciate you sending us a message
							explaining why you are skipping them so that we can improve our product.
						</p>
					</>
				),
			},
			{
				q: "How do I get my students onto the platform?",
				a: (
					<>
						<p>
							Every student needs their own CreateBase account. In a future update, they will gain the ability to sign in using their Google account. To get your students on the platform, get them to
							visit
							<a href="/" target="_blank">
								https://app.createbase.co.nz/
							</a>
						</p>
						<p>
							If your students don't have CreateBase accounts, tell them to click sign up and fill out each field. They will need to enter your organisation's learner code when they create their
							account. If you do not know what this is or how to get a learner code,
							<Link href="/faq/2-8">click here</Link>.
						</p>
						<p>If your students already have CreateBase accounts, they can click log in and enter their account details.</p>
						<img src="/faq/faq-2.jpg" />
						<p>
							Once they are logged in, they will need to navigate to the Browse page and select the Project you're teaching. In the example below, the Send It Project has been selected. They can then
							click continue to start the Project.
						</p>
						<img src="/faq/faq-5.jpg" />
					</>
				),
			},
			{
				q: "How much time should my students spend on the platform compared to group/class discussions?",
				a: (
					<>
						<p>
							The easy answer is as much as you're comfortable with. If you prefer class discussions, you may decide you want your students to do all the class discussion activities and even add some
							of your own. Instead, you may want to be hands-off and skip over class discussions and get your students to complete tasks on the platform as much as possible. There is no correct
							approach; teach as you please. The platform and lesson plans are here to help as much as required.
						</p>
					</>
				),
			},
		],
	},
	{
		header: "Accounts",
		icon: "person",
		items: [
			{
				q: "What are the different account types?",
				a: (
					<>
						<p>There are three different account types on the CreateBase platform; Admin, Educator and Learner.</p>
						<p className="faq__indent">
							<span className="faq__bold">Admin</span>: Admin accounts have access to the entire platform. They are in charge of managing their organisations' users and billing information.
						</p>
						<p className="faq__indent">
							<span className="faq__bold">Educator</span>: These accounts are for all the teachers in your organisation. They have access to Projects, lesson plans and FAQs.
						</p>
						<p className="faq__indent">
							<span className="faq__bold">Learner</span>: Learner accounts are for students and have the most restricted access. These accounts can only access Projects to reduce distractions and keep
							students on task. Each student in your class needs to create their own learner account to access the platform.
						</p>
					</>
				),
			},
			{
				q: "What can my account access?",
				a: (
					<>
						<p>Admin accounts have access to the entire platform, including their organisation's admin page.</p>
						<p>Educator accounts have access to Projects, lesson plans and FAQs.</p>
						<p>Learner accounts can only access Projects.</p>
					</>
				),
			},
			{
				q: "How do I upgrade my organisation to the paid version of CreateBase?",
				a: (
					<>
						<p>
							If you are the admin for your organisation, you can upgrade your account from the 18th of October through our website
							<a href="https://createbase.co.nz/" target="_blank">
								https://createbase.co.nz/
							</a>{" "}
							to gain access to the paid version of the platform.
						</p>
					</>
				),
			},
			{
				q: "How do I upgrade my educator account to an admin account?",
				a: (
					<>
						<p>
							If you have an educator account and wish to become an admin for your organisation, please ask one of your organisation's current admins. Admin accounts have the ability to upgrade
							educator accounts in their organisation to admin accounts through the admin console.
						</p>
					</>
				),
			},
			{
				q: "How do I join an existing organisation?",
				a: (
					<>
						<p>
							To join an organisation, go to the
							<a href="/user" target="_blank">
								My Account
							</a>{" "}
							page and click "Join an Org". You will then be prompted to enter your organisation's code, your school's ID and your school's name. If you don't know your organisation's code, talk to
							one of your organisation's admin users. They can generate a code for you from their admin console.
						</p>
						<img src="/faq/faq-9.jpg" />
					</>
				),
			},
			{
				q: "How do I register a new organisation?",
				a: (
					<>
						<p>
							At the end of your platform tutorial, there will be a prompt to create or join an organisation. You will need your school email address, school name, and school ID number to register a
							new organisation.
						</p>
						<p>
							To join an organisation with an existing account, you can also go to the
							<a href="/user" target="_blank">
								My Account
							</a>{" "}
							page and click Register your Org. You will then be prompted to enter your school's ID and name.
						</p>
						<img src="/faq/faq-10.jpg" />
						<p>If an organisation has already been created for your school and you think that this was a mistake, then contact CreateBase via our email for support.</p>
					</>
				),
			},
			{
				q: "What do I do if myself or one of my students has forgotten their account details?",
				a: <p>If you know the email of the account, you can reset your password by clicking the “Forgot your password?” button at the bottom right log-in screen.</p>,
			},
			{
				q: "How do I invite other teachers to my organisation?",
				a: (
					<>
						<p>When an organisation is created, the admin of that organsiation will be sent an email containing an educator code and a learner code.</p>
						<p>
							To invite other teachers to your organisation, you must share your organsiation's educator code with them. If you are the organisation's admin, it will be in your email inbox. If you are
							not, then contact your admin and ask for the code.
						</p>
						<p>The ability to view and generate educator codes is coming soon to the admin dashboard.</p>
					</>
				),
			},
			{
				q: "How do I invite students to my organisation?",
				a: (
					<>
						<p>When an organisation is created, the admin of that organsiation will be sent an email containing an educator code and a learner code.</p>
						<p>
							To invite students to your organisation, you must share your organsiation's learner code with them. If you are the organisation's admin, it will be in your email inbox. If you are not,
							then contact your admin and ask for the code.
						</p>
						<p>The ability to view and generate learner codes will be made available soon to all educator accounts in the organisation.</p>
					</>
				),
			},
		],
	},
	{
		header: "Other",
		icon: "help_outline",
		items: [
			{
				q: "What additional support is available from CreateBase?",
				a: (
					<>
						<p>
							Our platform is still under development. If you encounter any issues or things that you think could be optimised, then don't hesitate to contact us, and we will fix your problem or
							potentially add your feature/change request to our development pipeline.
						</p>
						<p>
							At this stage, we also offer more personal support to our paid users. If you are part of an organisation that has purchased CreateBase Pro, then contact us about the possibility of
							arranging product walkthroughs, teacher training and one-on-one support.
						</p>
					</>
				),
			},
			{
				q: "How can I contact CreateBase?",
				a: (
					<>
						<p>
							You can contact us for any reason via email at admin@createbase.co.nz or send us a message from our
							<a href="https://createbase.co.nz/contact" target="_blank">
								website
							</a>
							.
						</p>
						<p>We will respond to any questions, comments or enquiries within one working day.</p>
					</>
				),
			},
		],
	},
];
