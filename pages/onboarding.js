import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import useApi from "../hooks/useApi";
import GlobalSessionContext from "../store/global-session-context";
import MainLayout from "../components/Layouts/MainLayout/MainLayout";
import OnboardingSection from "../components/Onboarding/OnboardingSection";
import OnboardingVideo from "../components/Onboarding/OnboardingVideo";

import classes from "../styles/onboarding.module.scss";

const DUMMY_STATUS = { "getting-started": true, "flow-0": false, "not-group": false, "group-0": true, "group-1": false, "group-2": true, "group-3": true, "group-4": false, "group-5": false };

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
			videoUrl: "https://www.youtube.com/embed/SlRLHPSm17Y", // TODO
		},
		{
			id: "getting-started-1",
			type: "video",
			title: "Watch Learning on CreateBase",
			subtitle: "For students",
			videoUrl: "https://www.youtube.com/embed/SlRLHPSm17Y", // TODO
		},
	],
};

const FLOW_SECTION = {
	caption: "Get started with the basics of flow coding",
	tasks: [{ id: "flow-0", type: "link", title: "Your Flow Coding journey starts here", linkUrl: "/browse/magnebot" }],
};

const NOT_GROUP_SECTION = {
	caption: "To access group features, let’s get you into a group",
	hasOr: true,
	orId: "not-group",
	tasks: [
		{
			id: "not-group-0",
			type: "video",
			title: "Register your school",
			subtitle: "For admins and teachers",
			videoUrl: "https://www.youtube.com/embed/SlRLHPSm17Y", // TODO
			linkUrl: "/my-groups/register-school",
			linkLabel: "Go to school registration",
		},
		{
			id: "not-group-1",
			type: "video",
			title: "Join your school group",
			subtitle: "For students",
			videoUrl: "https://www.youtube.com/embed/SlRLHPSm17Y", // TODO
			linkUrl: "/my-groups/join-school",
			linkLabel: "Join a school",
		},
	],
};

const STAFF_SECTION = {
	tasks: [
		{ id: "group-0", type: "text", title: "A quick guide to Lesson Plans", content: null },
		{
			id: "group-1",
			type: "video",
			title: "Add students to your group",
			videoUrl: "https://www.youtube.com/embed/SlRLHPSm17Y", // TODO
			linkUrl: "/manage-group/students",
			linkLabel: "Add students in Manage Group",
		},
		{
			id: "group-2",
			type: "link",
			title: "The 5 Step Creation Process",
			linkUrl: "", // TODO
		},
		{
			id: "group-3",
			type: "link",
			title: "Tour of class features",
			subtitle: "Classes (1/3)",
			linkUrl: "", // TODO
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
			videoUrl: "https://www.youtube.com/embed/SlRLHPSm17Y", // TODO
			linkUrl: "/classes",
			linkLabel: "Go to Classes",
		},
	],
};

const SUPPORT_SECTION = {
	caption: "To access group features, let’s get you into a group",
	tasks: [{ id: "support-0", type: "link", title: "Visit the Support Center", linkUrl: "/support" }],
};

const Onboarding = () => {
	const { globalSession } = useContext(GlobalSessionContext);
	const post = useApi();
	const [statuses, setStatuses] = useState();
	const [videoModal, setVideoModal] = useState({ show: false, videoUrl: "" });

	useEffect(async () => {
		// TODO - retrieve saves
		// await post({
		// 	route: "/profile/read-saves",
		// 	input: { profileId: globalSession.profileId },
		// 	successHandler: (data) => {
		// 		console.log(data);
		// 	},
		// });
		setStatuses(DUMMY_STATUS);
	}, []);

	if (!statuses) return null;

	const checkHandler = (id) => {
		setStatuses((state) => ({ ...state, [id]: !state[id] }));
	};

	console.log(statuses);

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
				<OnboardingSection section={GETTING_STARTED_SECTION} statuses={statuses} setStatuses={setStatuses} checkHandler={checkHandler} setVideoModal={setVideoModal} />
				<OnboardingSection section={FLOW_SECTION} statuses={statuses} setStatuses={setStatuses} checkHandler={checkHandler} setVideoModal={setVideoModal} />
				{globalSession.recentGroups.length ? (
					<OnboardingSection
						section={{
							...STAFF_SECTION,
							caption: `Since you are an admin or teacher of ${globalSession.groups[globalSession.recentGroups[0]].name}${
								globalSession.recentGroups.length > 1 ? ` and ${globalSession.recentGroups.length - 1} other group${globalSession.recentGroups.length - 1 > 1 ? "s" : ""}` : ""
							}, here are a few tasks to help you set things up`,
							tasks: STAFF_SECTION.tasks.filter((task) => (task.id === "group-5" ? statuses["group-4"] : true)),
						}}
						statuses={statuses}
						setStatuses={setStatuses}
						checkHandler={checkHandler}
						setVideoModal={setVideoModal}
					/>
				) : null}
				<OnboardingSection section={NOT_GROUP_SECTION} statuses={statuses} setStatuses={setStatuses} checkHandler={checkHandler} setVideoModal={setVideoModal} />
				<OnboardingSection section={SUPPORT_SECTION} statuses={statuses} setStatuses={setStatuses} checkHandler={checkHandler} setVideoModal={setVideoModal} />
			</div>
			{videoModal.show && <OnboardingVideo state={videoModal} setState={setVideoModal} />}
		</div>
	);
};

Onboarding.getLayout = (page) => {
	return <MainLayout page="onboarding">{page}</MainLayout>;
};

Onboarding.auth = "any";

export default Onboarding;
