import { Dispatch, ReactElement, SetStateAction, useContext, useEffect, useState } from "react";
import Head from "next/head";
import useApi from "../hooks/useApi";
import GlobalSessionContext from "../store/global-session-context";
import ClassRequestNotification from "../components/Inbox/ClassRequestNotification";
import GroupRequestNotification from "../components/Inbox/GroupRequestNotification";
import MainLayout from "../components/Layouts/MainLayout/MainLayout";

import classes from "../styles/inbox.module.scss";

interface INotification {
	id: string;
	params: {
		class: {
			id: string;
			name: string;
		};
		group: {
			id: string;
			name: string;
		};
		user: {
			email: string;
			firstName: string;
			lastName: string;
			licenseId: string;
			profileId: string;
		};
		message: string;
	};
	type: "class-request" | "group-request";
}

const renderNotification = (notificationObject: INotification, setNotifications: Dispatch<SetStateAction<INotification[] | undefined>>) => {
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
	const { globalSession, setGlobalSession } = useContext(GlobalSessionContext);
	const [notifications, setNotifications] = useState<INotification[]>();
	const { post } = useApi();

	useEffect(() => {
		(async () => {
			await post(
				"/api/notifications/fetch",
				{
					profileId: globalSession.profileId,
					// to accelerate fetching, pass all the groups where the user is either an admin or a teacher
					groups: globalSession.groups.filter((group) => (group.role === "admin" || group.role === "teacher") && group.verified && group.status === "activated"),
				},
				(data) => setNotifications(data.content)
			);
		})();
	}, []);

	useEffect(() => {
		if (notifications) {
			setGlobalSession((state) => ({ ...state, numOfNotifications: notifications.length }));
		}
	}, [notifications]);

	if (!notifications) return null;

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

Inbox.getLayout = (page: ReactElement) => {
	return <MainLayout page="inbox">{page}</MainLayout>;
};

Inbox.auth = "user";

export default Inbox;
