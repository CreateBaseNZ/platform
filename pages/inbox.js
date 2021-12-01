import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import useApi from "../hooks/useApi";
import GlobalSessionContext from "../store/global-session-context";
import ClassRequestNotification from "../components/Inbox/ClassRequestNotification";
import GroupRequestNotification from "../components/Inbox/GroupRequestNotification";
import MainLayout from "../components/Layouts/MainLayout/MainLayout";

import classes from "../styles/inbox.module.scss";

const renderNotification = (notificationObject, setNotifications) => {
	switch (notificationObject.type) {
		case "class-request":
			return <ClassRequestNotification key={notificationObject.id} notification={notificationObject} setNotifications={setNotifications} />;
		case "group-request":
			return <GroupRequestNotification key={notificationObject.id} notification={notificationObject} setNotifications={setNotifications} />;
		default:
			return null;
	}
};

const Inbox = () => {
	const { globalSession } = useContext(GlobalSessionContext);
	const [notifications, setNotifications] = useState([]);
	const { post } = useApi();

	useEffect(async () => {
		await post({
			route: "/api/notifications/fetch",
			input: {
				profileId: globalSession.profileId,
				// to accelerate fetching, pass all the groups where the user is either an admin or a teacher
				groups: globalSession.groups.filter((group) => (group.role === "admin" || group.role === "teacher") && group.verified && group.status === "activated"),
			},
			successHandler: (data) => setNotifications(data.content),
		});
	}, []);

	return (
		<div className={`${classes.inbox} roundScrollbar`}>
			<Head>
				<title>Inbox ({notifications.length}) | CreateBase</title>
				<meta name="description" content="Check out your inbox on CreateBase" />
			</Head>
			<div className={classes.view}>
				<h1>Inbox</h1>
				<div className={classes.total}>{notifications.length} notifications</div>
				{notifications.map((notification) => renderNotification(notification, setNotifications))}
			</div>
		</div>
	);
};

Inbox.getLayout = (page) => {
	return <MainLayout page="inbox">{page}</MainLayout>;
};

Inbox.auth = "user";

export default Inbox;
