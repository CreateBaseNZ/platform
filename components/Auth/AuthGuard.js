import { useContext, useEffect } from "react";
import { signIn } from "next-auth/react";
import GlobalSessionContext from "../../store/global-session-context";
import router from "next/router";
import LoadingScreen from "../UI/LoadingScreen";

const hasAccess = (role, auth) => {
	switch (auth) {
		case "admin":
			return role === "admin";
		case "staff":
			return role === "admin" || role === "teacher";
		default:
			return true;
	}
};

const AuthGuard = ({ children, auth }) => {
	const { loaded, globalSession } = useContext(GlobalSessionContext);

	useEffect(() => {
		if (loaded) {
			if (!globalSession.accountId) {
				signIn();
			} else if (!globalSession.verified) {
				router.push({ pathname: "/auth/verify", query: router.query });
			}
		}
	}, [loaded, globalSession.accountId, globalSession.verified]);

	if (!loaded) return <LoadingScreen />;

	if (globalSession.accountId) {
		if (!globalSession.verified) {
			return <LoadingScreen />;
		} else if (hasAccess(globalSession.groups[globalSession.recentGroups[0]]?.role, auth)) {
			return children;
		} else {
			return <div>No access</div>;
		}
	}

	return <LoadingScreen />;
};

export default AuthGuard;
