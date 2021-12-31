import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import GlobalSessionContext from "../store/global-session-context";
import DEFAULT_TABS from "../constants/mainTabs";

const Index = () => {
	const router = useRouter();
	const { loaded, globalSession } = useContext(GlobalSessionContext);

	useEffect(() => {
		if (loaded) {
			if (globalSession.accountId) {
				if (globalSession.recentGroups?.length) {
					router.replace("/browse");
				} else {
					router.replace(DEFAULT_TABS[0].urlObject);
				}
			} else {
				signIn();
			}
		}
	}, [globalSession]);

	return null;
};

export default Index;
