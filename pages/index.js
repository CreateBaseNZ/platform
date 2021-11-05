import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import GlobalSessionContext from "../store/global-session-context";

const Index = () => {
	const router = useRouter();
	const { globalSession } = useContext(GlobalSessionContext);

	console.log(globalSession);

	useEffect(() => {
		if (globalSession.loaded) {
			if (globalSession.accountId) {
				if (globalSession.recentGroups.length) {
					console.log("viewing a group");
					router.replace("/browse");
				} else {
					console.log("not viewing a group");
					router.replace("/my-groups");
				}
			} else {
				signIn();
			}
		}
	}, [globalSession]);

	return null;
};

export default Index;
