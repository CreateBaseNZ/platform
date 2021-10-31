import { useContext, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import UserSessionContext from "../../store/user-session";

const hasAccess = (role, authorisation) => {
	switch (authorisation) {
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
	const { userSession } = useContext(UserSessionContext);

	console.log(userSession);
	console.log("guard rendered");
	//TODO email verification

	useEffect(() => {
		if (status !== "loading" && !session) {
			signIn();
		}
	}, [status, session]);

	if (session) {
		if (hasAccess(userSession.recentGroups[0].role, auth)) {
			return children;
		} else {
			return <div>No access</div>;
		}
	}

	return <div>App loading</div>;
};

export default AuthGuard;
