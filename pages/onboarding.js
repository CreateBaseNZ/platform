import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import MainLayout from "../components/Layouts/MainLayout/MainLayout";
import GlobalSessionContext from "../store/global-session-context";
import OnboardingSection from "../components/Onboarding/OnboardingSection";

import classes from "../styles/onboarding.module.scss";

const DUMMY_STATUS = { "getting-started": true, "flow-0": false, "not-group": false, "group-0": true, "group-1": false, "group-2": true, "group-3": true, "group-4": false, "group-5": false };

// TODO populate links, images, text, and videos

const GETTING_STARTED_SECTION = {
	caption: "Let's get you started! Here's a couple videos we've put together for you",
	hasOr: true,
	orId: "getting-started",
	tasks: [
		{ id: "getting-started-0", type: "video", title: "Watch Teaching on CreateBase", subtitle: "For admins and teachers", color: "#6853D9", thumbnail: "/task.png" },
		{ id: "getting-started-1", type: "video", title: "Watch Learning on CreateBase", subtitle: "For students", color: "#DF64D3", thumbnail: "/task.png" },
	],
};

const FLOW_SECTION = {
	caption: "Get started with the basics of flow coding",
	tasks: [{ id: "flow-0", type: "link", title: "Your Flow Coding journey starts here", link: "" }],
};

const NOT_GROUP_SECTION = {
	caption: "To access group features, let’s get you into a group",
	hasOr: true,
	orId: "not-group",
	tasks: [
		{ id: "not-group-0", type: "link", title: "Register your school", subtitle: "For admins and teachers", link: "" },
		{ id: "not-group-1", type: "link", title: "Join your school group", subtitle: "For students", link: "" },
	],
};

const GROUP_SECTION = {
	caption: "Since you are an admin or teacher of CreateBase Academy and 3 other groups, here are a few tasks to help you set things up",
	tasks: [
		{ id: "group-0", type: "link", title: "Invite people to your group", link: "" },
		{ id: "group-1", type: "text", title: "A quick guide to lesson plans", color: "#3C7EFF", imgUrl: "/task.png" },
		{ id: "group-2", type: "link", title: "Check out the Support tab", link: "/support" },
		{ id: "group-3", type: "link", title: "Tour of class features", subtitle: "Classes (1/3)" },
		{ id: "group-4", type: "link", title: "Create a class", subtitle: "Classes (2/3)", link: "" },
		{ id: "group-5", type: "link", title: "Add members to your class", subtitle: "Classes (3/3)", link: "" },
	],
};

const Onboarding = () => {
	const { globalSession } = useContext(GlobalSessionContext);
	const [statuses, setStatuses] = useState();

	useEffect(() => {
		// TODO - retrieve saves
		setStatuses(DUMMY_STATUS);
	}, []);

	if (!statuses) return null;

	const checkHandler = (id) => {
		setStatuses((state) => ({ ...state, [id]: !state[id] }));
	};

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
				<OnboardingSection section={GETTING_STARTED_SECTION} statuses={statuses} setStatuses={setStatuses} checkHandler={checkHandler} />
				<OnboardingSection section={FLOW_SECTION} statuses={statuses} setStatuses={setStatuses} checkHandler={checkHandler} />
				{globalSession.recentGroups.length ? (
					<OnboardingSection
						section={{
							...GROUP_SECTION,
							caption: `Since you are an admin or teacher of ${globalSession.groups[globalSession.recentGroups[0]].name}${
								globalSession.recentGroups.length > 1 ? ` and ${globalSession.recentGroups.length - 1} other group${globalSession.recentGroups.length - 1 > 1 ? "s" : ""}` : ""
							}, here are a few tasks to help you set things up`,
						}}
						statuses={statuses}
						setStatuses={setStatuses}
						checkHandler={checkHandler}
					/>
				) : null}
				<OnboardingSection section={NOT_GROUP_SECTION} statuses={statuses} setStatuses={setStatuses} checkHandler={checkHandler} />
			</div>
		</div>
	);
};

Onboarding.getLayout = (page) => {
	return <MainLayout page="onboarding">{page}</MainLayout>;
};

Onboarding.auth = "any";

export default Onboarding;
