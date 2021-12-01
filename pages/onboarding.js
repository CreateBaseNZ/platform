import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import useApi from "../hooks/useApi";
import GlobalSessionContext from "../store/global-session-context";
import MainLayout from "../components/Layouts/MainLayout/MainLayout";
import OnboardingSection from "../components/Onboarding/OnboardingSection";
import OnboardingVideo from "../components/Onboarding/OnboardingVideo";
import OnboardingText from "../components/Onboarding/OnboardingText";

import classes from "../styles/onboarding.module.scss";

const GETTING_STARTED_SECTION = {
	caption: "Let's get you started! Here's a couple videos we've put together for you",
	hasOr: true,
	orId: "getting-started",
	tasks: [
		{
			id: "getting-started-0",
			type: "video",
			title: "Watch Teaching on CreateBase",
			subtitle: "For admins and teachers",
			videoUrl: "https://www.youtube.com/embed/2fOdfDHPyGc",
		},
		{
			id: "getting-started-1",
			type: "video",
			title: "Watch Learning on CreateBase",
			subtitle: "For students",
			videoUrl: "https://www.youtube.com/embed/Fd9pVmFwVd8",
		},
	],
};

const FLOW_SECTION = {
	caption: "Get started with Flow coding",
	tasks: [{ id: "flow-0", type: "link", title: "Complete the first subsystem in MagneBot", linkUrl: "/browse/magnebot" }],
};

const GROUP_DEFAULT_SECTION = {
	caption: "To access group features, let’s get you into a group",
	hasOr: true,
	orId: "not-group",
	tasks: [
		{
			id: "not-group-0",
			type: "video",
			title: "Register your school",
			subtitle: "For admins and teachers",
			videoUrl: "https://www.youtube.com/embed/K9BLb9clLRk",
			linkUrl: "/my-groups/new-school",
			linkLabel: "Go to school registration",
		},
		{
			id: "not-group-1",
			type: "video",
			title: "Join your school",
			subtitle: "For students",
			videoUrl: "https://www.youtube.com/embed/VZ4wRCb_Up8",
			linkUrl: "/my-groups/join-school",
			linkLabel: "Join a school",
		},
	],
};

const STAFF_SECTION = {
	tasks: [
		{
			id: "group-0",
			type: "text",
			title: "A quick guide to Lesson Plans",
			content: (
				<>
					<p>Every Project on the CreateBase Platform comes with a pre-written set of lesson plans co-written by leading STEAM and Digital technology teachers.</p>
					<p>
						Using lesson plans reduces the time it takes to prepare for each lesson significantly. In saying this, lesson plans are entirely optional. They serve as an example of how the content could
						be delivered as part of a classroom setting, but you are free to integrate our Projects into your lessons in any way that you please.
					</p>
					<p>To access lesson plans:</p>
					<ul>
						<li>Choose a Project from the Project Library</li>
						<li>Open the teaching tab</li>
						<li>Open or download the lesson plan pdf</li>
					</ul>
					<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/lesson plan gif.gif" />
				</>
			),
		},
		{
			id: "group-1",
			type: "text",
			title: "Add students to your group",
			content: (
				<>
					<p>To add students to your Group walk them through this process:</p>
					<ol>
						<li>Create their own account</li>
						<li>Open the My Groups tab and select join a group</li>
						<li>Enter the student code</li>
					</ol>
					<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/adding students student process gif.gif" />
					<p>You can find the student code for your group by clicking “Add” on the Manage Group page.</p>
					<img src="https://raw.githubusercontent.com/CreateBaseNZ/public/main/support/student code.jpg" />
				</>
			),
		},
		{
			id: "group-2",
			type: "link",
			title: "The 5 Step Creation Process",
			linkUrl: "/support/teachers#the-5-step-creation-process",
		},
		{
			id: "group-3",
			type: "link",
			title: "Tour of class features",
			subtitle: "Classes (1/3)",
			linkUrl: "/support/teachers/student-tracking",
		},
		{
			id: "group-4",
			type: "link",
			title: "Create a class",
			subtitle: "Classes (2/3)",
			linkUrl: "/classes/new",
		},
		{
			id: "group-5",
			type: "video",
			title: "Add members to your class",
			subtitle: "Classes (3/3)",
			videoUrl: "https://www.youtube.com/embed/so383OzZ-rk",
			linkUrl: "/classes",
			linkLabel: "Go to Classes",
		},
	],
};

const SUPPORT_SECTION = {
	caption: "Here's some additional help and support",
	tasks: [{ id: "support-0", type: "link", title: "Visit the Support Center", linkUrl: "/support" }],
};

const Onboarding = () => {
	const { globalSession } = useContext(GlobalSessionContext);
	const { post } = useApi();
	const [statuses, setStatuses] = useState();
	const [videoModal, setVideoModal] = useState({ show: false, videoUrl: "" });
	const [textModal, setTextModal] = useState({ show: false, content: null });

	useEffect(async () => {
		await post({
			route: "/api/profile/read-saves",
			input: { profileId: globalSession.profileId, properties: ["onboardingStatuses"] },
			successHandler: (data) => setStatuses(data.content.onboardingStatuses || {}),
		});
	}, []);

	if (!statuses) return null;

	const checkHandler = async (id) => {
		const newStatuses = { ...statuses, [id]: !statuses[id] };
		await post({
			route: "/api/profile/update-saves",
			input: { profileId: globalSession.profileId, update: { onboardingStatuses: newStatuses } },
			successHandler: () => setStatuses((state) => ({ ...state, [id]: !state[id] })),
		});
	};

	const staffOfVerifiedGroups = globalSession.groups.filter((group) => group.verified && (group.role === "teacher" || group.role === "admin"));

	return (
		<div className={`${classes.onboarding} roundScrollbar`}>
			<Head>
				<title>Onboarding | CreateBase</title>
				<meta name="description" content="Get to know the platform by completing all the onboarding tasks" />
			</Head>
			<div className={classes.view}>
				<h1>
					Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}, {globalSession.firstName} 👋
				</h1>
				<OnboardingSection section={GETTING_STARTED_SECTION} statuses={statuses} setStatuses={setStatuses} checkHandler={checkHandler} setVideoModal={setVideoModal} setTextModal={setTextModal} />
				<OnboardingSection section={FLOW_SECTION} statuses={statuses} setStatuses={setStatuses} checkHandler={checkHandler} setVideoModal={setVideoModal} setTextModal={setTextModal} />
				{staffOfVerifiedGroups.length ? (
					<OnboardingSection
						section={{
							...STAFF_SECTION,
							caption: `Since you are an admin or teacher of ${staffOfVerifiedGroups[0].name}${
								staffOfVerifiedGroups.length > 1 ? ` and ${staffOfVerifiedGroups.length - 1} other group${staffOfVerifiedGroups.length - 1 > 1 ? "s" : ""}` : ""
							}, here are a few tasks to help you set things up`,
							tasks: STAFF_SECTION.tasks.filter((task) => (task.id === "group-5" ? statuses["group-4"] : true)),
						}}
						statuses={statuses}
						setStatuses={setStatuses}
						checkHandler={checkHandler}
						setVideoModal={setVideoModal}
						setTextModal={setTextModal}
					/>
				) : null}
				<OnboardingSection section={GROUP_DEFAULT_SECTION} statuses={statuses} setStatuses={setStatuses} checkHandler={checkHandler} setVideoModal={setVideoModal} setTextModal={setTextModal} />
				<OnboardingSection section={SUPPORT_SECTION} statuses={statuses} setStatuses={setStatuses} checkHandler={checkHandler} setVideoModal={setVideoModal} setTextModal={setTextModal} />
			</div>
			{videoModal.show && <OnboardingVideo state={videoModal} setState={setVideoModal} />}
			{textModal.show && <OnboardingText state={textModal} setState={setTextModal} />}
		</div>
	);
};

Onboarding.getLayout = (page) => {
	return <MainLayout page="onboarding">{page}</MainLayout>;
};

Onboarding.auth = "any";

export default Onboarding;
