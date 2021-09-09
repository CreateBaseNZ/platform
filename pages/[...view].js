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

	useEffect(() => {
		setLoaded(true);
		return () => setLoaded(false);
	}, []);

	useEffect(async () => {
		await initSession(loading, session, setUser);
	}, [loading, session]);

	useEffect(() => {
		console.log(router);
		const query = router.query.view && router.query.view[0].toLowerCase();
		console.log(query);
		if (query && query === "onboarding") {
			console.log(user.type);
			if (user.type === "educator" || user.type === "admin") {
				setView("onboarding");
			} else {
				router.replace("browse");
			}
		} else if (query) {
			setView(query);
		}
	}, [router]);

	if (loading) {
		return null;
	}

	return (
		<Frame route={router.asPath} user={user} setUser={setUser}>
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
