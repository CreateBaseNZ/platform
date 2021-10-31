import { useContext, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import GlobalSessionContext from "../../store/global-session-context";

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
	const { data: session, status } = useSession();
	const { globalSession } = useContext(GlobalSessionContext);

	console.log(globalSession);
	console.log("guard rendered");
	//TODO email verification

	useEffect(() => {
		if (globalSession.loaded && globalSession.email) {
			signIn();
		}
	}, [status, session]);

	if (globalSession.email) {
		if (hasAccess(globalSession.recentGroups[0].role, auth)) {
			return children;
		} else {
			return <div>No access</div>;
		}
	}

	return <div>App loading</div>;
};

export default AuthGuard;
