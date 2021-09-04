import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import Head from "next/head";
import MyAccount from "../../components/MyAccount/MyAccount";

import classes from "/styles/userView.module.scss";
import Frame from "../../components/Frame";
import { initSession } from "../../utils/authHelpers";

const UserView = ({ setLoaded }) => {
	const router = useRouter();
	const [session, loading] = useSession();
	const [user, setUser] = useState();
	const [view, setView] = useState("my-account");

	useEffect(() => {
		setLoaded(true);
		return () => setLoaded(false);
	}, []);

	useEffect(() => {
		console.log(router.query);
		if (Object.keys(router.query).length) {
			const query = router.query.userView;
			if (query) {
				setView(query[0]);
			}
		}
		setView("my-account");
	}, [router.query]);

	console.log(session);

	useEffect(async () => {
		initSession(session, setUser);
	}, [session]);

	if (loading) return null;

	if (!session) {
		router.replace("/auth");
		return null;
	}

	if (!user) return null;

	console.log(user);

	return (
		<Frame tabIndex={2} session={session} type={user.type} org={user.org} username={user.username} displayName={user.displayName}>
			<Head>
				<title style={{ textTransform: "capitalize" }}>{user.displayName && user.displayName + " | "} CreateBase</title>
				<meta name="description" content="Edit account settings for your CreateBase account. Join an existing organisation or create your own." />
			</Head>
			{view === "my-account" && <MyAccount user={user} setUser={setUser} />}
		</Frame>
	);
};

export default UserView;
