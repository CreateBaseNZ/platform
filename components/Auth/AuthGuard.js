import { useContext, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import GlobalSessionContext from "../../store/global-session-context";
import router from "next/router";

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
	const { globalSession } = useContext(GlobalSessionContext);

	console.log(globalSession);
	console.log("guard rendered");
	//TODO email verification

	useEffect(() => {
		if (globalSession.loaded) {
			if (!globalSession.id) {
				signIn();
			} else if (!globalSession.verified) {
				router.push({ pathname: "/auth/verify", query: router.query });
			}
		}
	}, [globalSession]);

	if (!globalSession.loaded) return <div>App loading</div>;

	if (globalSession.id) {
		if (!globalSession.verified) {
			return null;
		} else if (hasAccess(globalSession.recentGroups[0].role, auth)) {
			return children;
		} else {
			return <div>No access</div>;
		}
	}

	return <div>App loading</div>;
};

export default AuthGuard;
