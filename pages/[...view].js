import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import Frame from "../components/Frame/Frame";
import Browse from "../components/Browse/browse";
import { initSession } from "../utils/authHelpers";
import Onboarding from "../components/onboarding";
import Faq from "../components/Faq";
import User from "../components/User";

import viewTabs from "../utils/viewTabs";

const View = ({ setLoaded }) => {
	const router = useRouter();
	const [session, loading] = useSession();
	const [view, setView] = useState();
	const [user, setUser] = useState({ loaded: false });
	const [collapseHeader, setCollapseHeader] = useState(false);

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
			if (query) {
				if (viewTabs[user.type].some((t) => t.view === query)) {
					setView(query);
				} else {
					// router.replace(viewTabs[user.type][0].route);
					alert("please log in to continue");
					router.replace(`/auth/login/${router.query.view.join("/")}`);
				}
			}
		}
	}, [router, user.loaded]);

	if (loading) {
		return null;
	}

	return (
		<Frame route={router.asPath} user={user} collapseHeader={collapseHeader}>
			<Head>
				<title>CreateBase</title>
				<meta name="description" content="Welcome to CreateBase" />
			</Head>
			{view === "onboarding" && <Onboarding user={user} />}
			{view === "browse" && <Browse user={user} />}
			{view === "faq" && <Faq user={user} />}
			{view === "user" && <User user={user} setUser={setUser} collapseHeader={collapseHeader} setCollapseHeader={setCollapseHeader} />}
		</Frame>
	);
};

export default View;
