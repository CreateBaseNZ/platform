import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import GlobalSessionContext from "../store/global-session-context";
import DEFAULT_TABS from "../constants/mainTabs";

const Index = (): JSX.Element => {
	const router = useRouter();
	const { globalSession } = useContext(GlobalSessionContext);

	if (!globalSession.loaded) return <></>;

	if (!globalSession.accountId) {
		console.log("not signed in");
		signIn();
		return <></>;
	}

	if (globalSession.recentGroups.length) {
		router.replace("/browse");
		return <></>;
	}

	router.replace(DEFAULT_TABS[0].urlObject);
	return <></>;
};

export default Index;
