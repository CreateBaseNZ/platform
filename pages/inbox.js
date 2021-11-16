import Head from "next/head";
import MainLayout from "../components/Layouts/MainLayout/MainLayout";

import classes from "/styles/inbox.module.scss";

const DUMMY_INBOX = [
	{ type: "group", groupId: "xyz123", className: "CreateBase Academy" },
	{ type: "class", classId: "abc123", className: "Room 23" },
];

const Inbox = () => {
	return (
		<div className={classes.inbox}>
			<Head>
				<title>Inbox | CreateBase</title>
				<meta name="description" content="Check out your inbox on CreateBase" />
			</Head>
			<div className={classes.view}>
				<h1>Inbox</h1>
			</div>
		</div>
	);
};

Inbox.getLayout = (page) => {
	return <MainLayout page="inbox">{page}</MainLayout>;
};

Inbox.auth = "user";

export default Inbox;
