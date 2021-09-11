import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import Frame from "../components/Frame";
import Browse from "../components/Browse/browse";
import { initSession } from "../utils/authHelpers";
import Onboarding from "../components/onboarding";
import Faq from "../components/Faq";
import User from "../components/User";

const View = ({ setLoaded }) => {
	const router = useRouter();
	const [session, loading] = useSession();
	const [view, setView] = useState();
	const [user, setUser] = useState({ loaded: false });

	console.log(user);

	useEffect(() => {
		setLoaded(true);
		return () => setLoaded(false);
	}, []);

	useEffect(async () => {
		await initSession(loading, session, setUser);
	}, [loading, session]);

	useEffect(() => {
		if (user.loaded) {
			const query = router.query.view && router.query.view[0].toLowerCase();
			console.log(query);
			if (query && query === "onboarding") {
				console.log(user.type);
				if (user.type === "educator" || user.type === "admin") {
					setView(query);
				} else {
					router.replace("browse");
				}
			} else if (query && query === "user" && !user.type) {
				router.replace("browse");
			} else if (query) {
				setView(query);
			}
		}
	}, [router, user.loaded]);

	if (loading) {
		return null;
	}

	return (
		<Frame route={router.asPath} user={user}>
			<Head>
				<title>CreateBase</title>
				<meta name="description" content="Welcome to CreateBase" />
			</Head>
			{view === "onboarding" && <Onboarding user={user} />}
			{view === "browse" && <Browse user={user} />}
			{view === "faq" && <Faq user={user} />}
			{view === "user" && <User user={user} setUser={setUser} />}
		</Frame>
	);
};

export default View;
