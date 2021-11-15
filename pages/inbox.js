import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import ClassRequestNotification from "../components/Inbox/ClassRequestNotification";
import GroupRequestNotification from "../components/Inbox/GroupRequestNotification";
import MainLayout from "../components/Layouts/MainLayout/MainLayout";
import useHandleResponse from "../hooks/useHandleResponse";
import GlobalSessionContext from "../store/global-session-context";

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
	const { handleResponse } = useHandleResponse();
	const [notifications, setNotifications] = useState([]);

	useEffect(async () => {
		const DUMMY_STATUS = "succeeded";
		const inputs = { profileId: globalSession.profileId, accountId: globalSession.accountId };
		let data = {};
		try {
			data = (await axios.post("/api/notifications/fetch", { PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY, input: inputs, status: DUMMY_STATUS }))["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			handleResponse({
				data,
				failHandler: () => {},
				successHandler: () => {
					setNotifications(data.content);
				},
			});
		}
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
